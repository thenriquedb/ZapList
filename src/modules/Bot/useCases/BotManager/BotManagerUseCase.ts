import { ITrack } from "@modules/Spotify/entities/Track";
import { AppError } from "@shared/core/errors/AppError";
import { ISpotifyAdapter } from "@shared/ports/SpotifyAdapter";

interface IPersistence {
  users: Record<
    string,
    {
      search_term: string;
      search_result: ITrack[];
      added_history: ITrack[];
    }
  >;
}

const initialData = {
  search_term: "",
  search_result: [],
  added_history: [],
};

type Event = ["adicionar" | "buscar" | "historico", string | undefined];

const persistence = {
  users: {},
} as IPersistence;

export class BotDispatcherUseCase {
  private readonly spotifyAdapter: ISpotifyAdapter;

  constructor(spotifyAdapter: ISpotifyAdapter) {
    this.spotifyAdapter = spotifyAdapter;
  }

  private async searchTracks(query: string, waId: string) {
    try {
      const tracks = await this.spotifyAdapter.searchTracks(query);

      persistence.users[waId].search_term = query;
      persistence.users[waId].search_result = tracks;

      return this.formatSearchTracks(tracks);
    } catch (error) {
      throw new AppError(error);
    }
  }

  private formatSearchTracks(tracks: ITrack[]) {
    const LINE_BREAK = "\n";
    const message = [""];

    tracks.forEach((track, index) => {
      const firstLine = `*${index + 1}) ${track.name}*`;
      const secondLine = `*Artista*: ${track.artist[0]}`;
      const thirdLine = `*Albúm*: ${track.album}`;
      const fourLine = `*Prévia*: ${track.previewUrl}`;

      message.push(firstLine);
      message.push(secondLine);
      message.push(thirdLine);
      message.push(fourLine);
      message.push(LINE_BREAK);
    });

    return message.join(LINE_BREAK);
  }

  private async insertOnPlaylist(message: string, waId: string) {
    try {
      const index = Number(message) - 1;
      const track = persistence.users[waId].search_result[index];

      persistence.users[waId].added_history.push(track);

      await this.spotifyAdapter.addTracksToPlaylist(track.uri);

      return `${track.name} foi adicionada com sucesso a playlist!`;
    } catch (error) {
      console.log(error);

      return `Não foi possível encontrar nenhuma faixa com id *"${message}"*`;
    }
  }

  private listTrackHistory(waId: string) {
    if (persistence.users[waId].added_history.length === 0) {
      return `Parece que você ainda não adicionou nenhuma faixa`;
    }

    return JSON.stringify(persistence.users[waId].added_history);
  }

  async execute(message: string, waId: string): Promise<string> {
    const defaultMessage =
      "Seja bem vindo ao Zapfy! Adicione músicas em sua playlist diretamente pelo Whatsapp!. O bot tem suporte aos seguintes comandos:\n\n*Buscar: <nome-da-faixa>*\n*Adicionar: <id-da-faxa>*\n*Historico*";

    const command = message.substring(0, message.indexOf(" "));
    const data = message.substring(message.indexOf(" ") + 1);
    let response = defaultMessage;

    if (!persistence.users[waId]) {
      persistence.users[waId] = initialData;
    }

    switch (command.toLowerCase()) {
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
        return defaultMessage;
    }

    return response;
  }
}
