import { IBotRepository } from "@modules/Bot/repositories/IBotRepository";
import { ITrack } from "@modules/Spotify/entities/Track";

interface IDatabaseSchema {
  users: Record<
    string,
    {
      search_term: string;
      search_result: ITrack[];
      added_history: ITrack[];
    }
  >;
}

const database = {
  users: {},
} as IDatabaseSchema;

export class BotRepository implements IBotRepository {
  private database: IDatabaseSchema = database;

  initUserRegistryIfNotExists(waId: string) {
    if (!this.database.users[waId]) {
      this.database.users[waId] = {
        search_term: "",
        search_result: [],
        added_history: [],
      };
    }
  }

  listTracksAddedHistory(waId: string) {
    return this.database.users[waId].added_history;
  }

  listSearchResult(waId: string) {
    console.log({ [waId]: this.database.users[waId].search_result });

    return this.database.users[waId].search_result;
  }

  saveSearch(waId: string, searchTerm: string, tracks: ITrack[]) {
    this.database.users[waId].search_term = searchTerm;
    this.database.users[waId].search_result = tracks;

    console.log({ [waId]: this.database.users[waId].search_result });
  }

  saveTrackOnHistory(waId: string, track: ITrack) {
    this.initUserRegistryIfNotExists(waId);

    this.database.users[waId].added_history.push(track);
  }
}
