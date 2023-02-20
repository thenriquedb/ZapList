import { ITrack } from "@modules/Spotify/entities/ITrack";

export type UserRegistry = {
  search_term: string;
  search_result: ITrack[];
  added_history: ITrack[];
};

export interface IDatabaseSchema {
  users: Record<string, UserRegistry>;
}

export interface IBotRepository {
  saveTrackOnHistory(waId: string, track: ITrack): void;
  saveSearch(waId: string, query: string, tracks: ITrack[]): void;
  getUser(waId: string): UserRegistry;
  listSearchResult(waId: string): ITrack[];
  listTracksAddedHistory(waId: string): ITrack[];
}
