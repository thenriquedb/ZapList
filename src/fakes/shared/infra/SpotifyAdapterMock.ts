import { generateFakeTrackArray } from "@fakes/Spotify/generateFakeTrack";
import { ITrack } from "@modules/Spotify/entities/ITrack";
import { AppError } from "@shared/core/errors/AppError";
import { ISpotifyAdapter } from "@shared/ports/ISpotifyAdapter";

export const apiMock = {
  tracks: {
    emicida: generateFakeTrackArray(),
    fbc: generateFakeTrackArray(),
    racionais: generateFakeTrackArray(),
  },
  playslist: [],
};

export class SpotifyAdapterMock implements ISpotifyAdapter {
  async searchTracks(query: string): Promise<ITrack[]> {
    try {
      if (!apiMock.tracks[query]) {
        throw new Error();
      }
      const response = apiMock.tracks[query];
      return response;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async addTracksToPlaylist(trackUri: string): Promise<void> {
    apiMock.playslist.push(trackUri);
  }

  async trackAlreadyAddedIntoPlaylist(trackUri: string): Promise<boolean> {
    return apiMock.playslist.includes(trackUri);
  }
}
