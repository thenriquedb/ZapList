import { SearchTracksRequestUseCase } from "@modules/Spotify/useCases/SearchTracksRequest";

export class ListTracksSuggestionsUseCase {
  private readonly searchTracksRequestUseCase: SearchTracksRequestUseCase;

  constructor(searchTracksRequestUseCase: SearchTracksRequestUseCase) {
    this.searchTracksRequestUseCase = searchTracksRequestUseCase;
  }

  async execute(query: string): Promise<string> {
    const tracks = await this.searchTracksRequestUseCase.execute(query);

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
}
