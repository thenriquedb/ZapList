import { container } from "tsyringe";

import { InsertTrackIntoPlayListUseCase } from "@modules/Spotify/useCases/InsertTrackIntoPlayList";
import { SearchTracksRequestUseCase } from "@modules/Spotify/useCases/SearchTracksRequest";
import { ListTracksSuggestionsUseCase } from "@modules/Bot/useCases/ListTracksSuggestionsUseCase";

import { spotifyApi, SpotifyWebApi } from "../spotify";

container.registerSingleton<SpotifyWebApi>("SpotifyWebApi", spotifyApi);

container.registerSingleton<SearchTracksRequestUseCase>(
  "SearchTracksRequestUseCase",
  SearchTracksRequestUseCase
);

container.registerSingleton<ListTracksSuggestionsUseCase>(
  "ListTracksSuggestionsUseCase",
  ListTracksSuggestionsUseCase
);

container.registerSingleton<InsertTrackIntoPlayListUseCase>(
  "InsertTrackIntoPlayListUseCase",
  InsertTrackIntoPlayListUseCase
);
