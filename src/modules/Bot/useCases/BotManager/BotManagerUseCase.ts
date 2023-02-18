import { IBotRepository } from "@modules/Bot/repositories/IBotRepository";
import { ITrack } from "@modules/Spotify/entities/Track";
import { BotResponseCode } from "@shared/core/response-code/BotResponseCode";
import { ISpotifyAdapter } from "@shared/ports/ISpotifyAdapter";

type IResponse =
  | {
    code:
    | BotResponseCode.TRACK_SEARCH_SUCCESSFUL
    | BotResponseCode.LIST_HISTORY_SUCCESSFUL
    | BotResponseCode.ADDED_HISTORY_EMPTY;
    data: ITrack[];
  }
  | {
    code: BotResponseCode.TRACK_ADDED_TO_PLAYLIST_SUCCESSFUL;
    data: ITrack;
  }
  | {
    code:
    | BotResponseCode.TRACK_ADDED_TO_PLAYLIST_SUCCESSFUL
    | BotResponseCode.TRACK_ALREADY_ADDED_ON_PLAYLIST;
    data: ITrack;
  }
  | {
    code: BotResponseCode.INVALID_INPUT;
    data: string;
  }
  | {
    code: BotResponseCode.TRACK_NOT_FOUND | BotResponseCode.INVALID_TRACK_ID;
    data: string;
  };

export class BotDispatcherUseCase {
  private readonly spotifyAdapter: ISpotifyAdapter;
  private readonly repository: IBotRepository;

  constructor(spotifyAdapter: ISpotifyAdapter, repository: IBotRepository) {
    this.spotifyAdapter = spotifyAdapter;
    this.repository = repository;
  }

  private async searchTracks(query: string, waId: string): Promise<IResponse> {
    try {
      const tracks = await this.spotifyAdapter.searchTracks(query);

      this.repository.saveSearch(waId, query, tracks);

      return {
        code: BotResponseCode.TRACK_SEARCH_SUCCESSFUL,
        data: tracks,
      };
    } catch (error) {
      console.log("Search tracks error", error);

      return {
        code: BotResponseCode.TRACK_NOT_FOUND,
        data: query,
      };
    }
  }

  private async insertOnPlaylist(trackIndex: string, waId: string): Promise<IResponse> {
    try {
      const index = Number(trackIndex) - 1;

      const searchResult = this.repository.listSearchResult(waId);
      console.log({ searchResult });
      const track = searchResult[index];

      if (!track) {
        return {
          code: BotResponseCode.INVALID_TRACK_ID,
          data: trackIndex,
        };
      }

      const trackAlreadyAdded = await this.spotifyAdapter.trackAlreadyAddedIntoPlaylist(
        track.uri
      );

      if (trackAlreadyAdded) {
        return {
          code: BotResponseCode.TRACK_ALREADY_ADDED_ON_PLAYLIST,
          data: track,
        };
      }

      await this.spotifyAdapter.addTracksToPlaylist(track.uri);
      this.repository.saveTrackOnHistory(waId, track);

      return {
        code: BotResponseCode.TRACK_ADDED_TO_PLAYLIST_SUCCESSFUL,
        data: track,
      };
    } catch (error) {
      console.log("Error search tracks", error);

      return {
        code: error.responseCode,
        data: error.message,
      };
    }
  }

  private listTrackHistory(waId: string): IResponse {
    if (this.repository.listTracksAddedHistory(waId).length === 0) {
      return {
        code: BotResponseCode.ADDED_HISTORY_EMPTY,
        data: [],
      };
    }

    const tracks = this.repository.listTracksAddedHistory(waId);

    return {
      code: BotResponseCode.LIST_HISTORY_SUCCESSFUL,
      data: tracks,
    };
  }

  private sanatizeMessage(message: string): [string, string] {
    const delimiterIndex = message.indexOf(" ");
    let command = "";
    let data = "";

    if (delimiterIndex >= 0) {
      command = message.substring(0, delimiterIndex);
      data = message.substring(delimiterIndex + 1);
    } else {
      command = message;
    }

    return [command.toLowerCase(), data];
  }

  async execute(message: string, waId: string): Promise<IResponse> {
    const [command, data] = this.sanatizeMessage(message);

    let response: IResponse = {
      code: null,
      data: null,
    };

    this.repository.initUserRegistryIfNotExists(waId);
    console.log({ command, data });

    switch (command) {
      case "buscar":
        response = await this.searchTracks(data.trim(), waId);
        break;

      case "adicionar":
        response = await this.insertOnPlaylist(data.trim(), waId);
        break;

      case "historico":
        response = this.listTrackHistory(waId);
        break;

      default:
        return {
          code: BotResponseCode.INVALID_INPUT,
          data: command,
        };
    }

    return response;
  }
}
