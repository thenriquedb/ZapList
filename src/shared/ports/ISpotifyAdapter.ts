import { ITrack } from "@modules/Spotify/entities/ITrack";

export interface ISpotifyAdapter {
  searchTracks(query: string): Promise<ITrack[]>;
  addTracksToPlaylist(trackUri: string): Promise<void>;
  trackAlreadyAddedIntoPlaylist(trackUri: string): Promise<boolean>;
}
