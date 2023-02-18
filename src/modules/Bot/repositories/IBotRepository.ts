import { ITrack } from "@modules/Spotify/entities/Track";

export interface IBotRepository {
  saveTrackOnHistory(waId: string, track: ITrack): void;
  saveSearch(waId: string, query: string, tracks: ITrack[]): void;
  initUserRegistryIfNotExists(waId: string): void;
  listSearchResult(waId: string): ITrack[];
  listTracksAddedHistory(waId: string): ITrack[];
}
