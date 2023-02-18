import SpotifyWebApiNode from "spotify-web-api-node";

import { AppError } from "@shared/core/errors/AppError";
import { ITrack } from "@modules/Spotify/entities/Track";
import { ISpotifyAdapter } from "@shared/ports/ISpotifyAdapter";

export class SpotifyAdapter implements ISpotifyAdapter {
  private spotifyWebApi: SpotifyWebApiNode;

  constructor(spotifyWebApi: SpotifyWebApiNode) {
    this.spotifyWebApi = spotifyWebApi;
  }

  public async searchTracks(query: string, options = { limit: 6 }) {
    try {
      const response = await this.spotifyWebApi.searchTracks(query, options);

      const tracks = this.mapFetchedTracks(response.body);

      return tracks;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  private mapFetchedTracks(response: SpotifyApi.SearchResponse): ITrack[] {
    return response.tracks.items.map((track) => ({
      name: track.name,
      id: track.id,
      artist: track.artists.map((artist) => artist.name),
      uri: track.uri,
      duration: track.duration_ms,
      album: track.album.name,
      previewUrl: track.preview_url,
    }));
  }

  public async addTracksToPlaylist(trackUri: string) {
    const playListWillBeUsedId = await this.getPlaylistWillBeUsedId();

    await this.spotifyWebApi.addTracksToPlaylist(playListWillBeUsedId, [trackUri]);
  }

  private async getPlaylistWillBeUsedId(): Promise<string> {
    const response = await this.spotifyWebApi.getUserPlaylists();
    const userPlaylists = response.body.items;

    const playlistBeWillBeUsed = userPlaylists.find(
      (playlist) => playlist.name === process.env.SPOTIFY_PLAYLIST_NAME
    );

    return playlistBeWillBeUsed.id;
  }

  private async getPlaylistTracks(): Promise<SpotifyApi.PlaylistTrackObject[]> {
    const playListWillBeUsedId = await this.getPlaylistWillBeUsedId();

    const playlistTracks = await this.spotifyWebApi.getPlaylistTracks(
      playListWillBeUsedId
    );

    return playlistTracks.body.items;
  }

  public async trackAlreadyAddedIntoPlaylist(trackUri: string) {
    const playlistTracks = await this.getPlaylistTracks();

    const track = playlistTracks.find(({ track }) => track.uri === trackUri);

    return Boolean(track);
  }
}
