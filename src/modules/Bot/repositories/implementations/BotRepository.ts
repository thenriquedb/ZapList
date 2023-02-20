import {
  IBotRepository,
  IDatabaseSchema,
  UserRegistry,
} from "@modules/Bot/repositories/IBotRepository";
import { ITrack } from "@modules/Spotify/entities/ITrack";

export class BotRepository implements IBotRepository {
  private database: IDatabaseSchema = {
    users: {},
  } as IDatabaseSchema;

  private initUserRegistryIfNotExists(waId: string) {
    if (!this.database.users[waId]) {
      this.database.users[waId] = {
        search_term: "",
        search_result: [],
        added_history: [],
      };
    }
  }

  getUser(waId: string): UserRegistry {
    this.initUserRegistryIfNotExists(waId);
    return this.database.users[waId];
  }

  listTracksAddedHistory(waId: string) {
    this.initUserRegistryIfNotExists(waId);
    return this.database.users[waId].added_history;
  }

  listSearchResult(waId: string) {
    this.initUserRegistryIfNotExists(waId);
    return this.database.users[waId].search_result;
  }

  saveSearch(waId: string, searchTerm: string, tracks: ITrack[]) {
    this.initUserRegistryIfNotExists(waId);

    this.database.users[waId].search_term = searchTerm;
    this.database.users[waId].search_result = tracks;
  }

  saveTrackOnHistory(waId: string, track: ITrack) {
    this.initUserRegistryIfNotExists(waId);

    this.database.users[waId].added_history.push(track);
  }
}
