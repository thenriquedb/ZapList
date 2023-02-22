import { BotRepository } from "@modules/Bot/repositories/implementations/BotRepository";
import { BotDispatcherUseCase } from "@modules/Bot/useCases/BotDispatcher/BotDispatcherUseCase";
import { SpotifyWebApi } from "@shared/infra/spotify";
import { SpotifyAdapter } from "@shared/infra/spotify/SpotifyAdapter";

export default () => {
  const spotifyApi = SpotifyWebApi.getInstance();
  const spotifyAdapter = new SpotifyAdapter(spotifyApi);
  const botRepository = new BotRepository();

  return new BotDispatcherUseCase(spotifyAdapter, botRepository);
};
