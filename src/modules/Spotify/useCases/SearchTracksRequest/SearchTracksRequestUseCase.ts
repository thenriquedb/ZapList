import { SpotifyWebApi } from "@shared/infra/spotify";
import { ITrack } from "@modules/Spotify/entities/ITrack";
import { AppError } from "@shared/infra/core/errors/AppError";

export class SearchTracksRequestUseCase {
  private readonly spotifyWebApi: SpotifyWebApi;

  constructor(spotifyWebApi: SpotifyWebApi) {
    this.spotifyWebApi = spotifyWebApi;
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

  async execute(query: string) {
    try {
      const response = await this.spotifyWebApi.searchTracks(query, { limit: 6 });

      const tracks = this.mapFetchedTracks(response.body);

      return tracks;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
