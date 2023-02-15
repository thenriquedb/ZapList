import { SpotifyWebApi } from "@shared/infra/spotify";
import { BadRequestError } from "@shared/infra/core/errors/BadRequestError";

export class InsertTrackIntoPlayListUseCase {
  private readonly spotifyWebApi: SpotifyWebApi;

  constructor(spotifyWebApi: SpotifyWebApi) {
    this.spotifyWebApi = spotifyWebApi;
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

  private async trackAlreadyAddedIntoPlaylist(trackUri: string) {
    const playlistTracks = await this.getPlaylistTracks();

    const track = playlistTracks.find(({ track }) => track.name === trackUri);

    return Boolean(track);
  }

  async execute(trackUri: string) {
    const playListWillBeUsedId = await this.getPlaylistWillBeUsedId();
    const trackAlreadyAdded = await this.trackAlreadyAddedIntoPlaylist(trackUri);

    if (trackAlreadyAdded) {
      throw new BadRequestError("Track already added");
    }

    await this.spotifyWebApi.addTracksToPlaylist(playListWillBeUsedId, [trackUri]);
  }
}
