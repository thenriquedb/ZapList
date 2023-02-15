import { ListTracksSuggestionsUseCase } from "../ListTracksSuggestionsUseCase";

export class BotDispatcherUseCase {
  private readonly listTracksSuggestionsUseCase: ListTracksSuggestionsUseCase;

  constructor(listTracksSuggestionsUseCase: ListTracksSuggestionsUseCase) {
    this.listTracksSuggestionsUseCase = listTracksSuggestionsUseCase;
  }

  async execute(message: string): Promise<string> {
    const defaultMessage = "Opção inválida";

    const tracks = await this.listTracksSuggestionsUseCase.execute("emicida");

    return tracks;
    // switch (message) {
    //   case "1":
    //     return "ok";

    //   default:
    //     return defaultMessage;
    // }
  }
}
