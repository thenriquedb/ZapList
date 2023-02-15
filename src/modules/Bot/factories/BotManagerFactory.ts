import { BotDispatcherUseCase } from "@modules/Bot/useCases/BotManager/BotManagerUseCase";
import { ListTracksSuggestionsUseCase } from "@modules/Bot/useCases/ListTracksSuggestionsUseCase";
import { SearchTracksRequestUseCase } from "@modules/Spotify/useCases/SearchTracksRequest";
import { SpotifyWebApi } from "@shared/infra/spotify";

export default () => {
  const spotifyApi = SpotifyWebApi.getInstance();
  const searchTracksRequestUseCase = new SearchTracksRequestUseCase(spotifyApi);
  const listTracksSuggestionsUseCase = new ListTracksSuggestionsUseCase(
    searchTracksRequestUseCase
  );

  return new BotDispatcherUseCase(listTracksSuggestionsUseCase);
};
