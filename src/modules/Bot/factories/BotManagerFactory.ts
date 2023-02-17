import { BotDispatcherUseCase } from "@modules/Bot/useCases/BotManager/BotManagerUseCase";
import { SpotifyWebApi } from "@shared/infra/spotify";
import { SpotifyAdapter } from "@shared/infra/spotify/SpotifyAdapter";

export default () => {
  const spotifyApi = SpotifyWebApi.getInstance();
  const spotifyAdapter = new SpotifyAdapter(spotifyApi);

  return new BotDispatcherUseCase(spotifyAdapter);
};
