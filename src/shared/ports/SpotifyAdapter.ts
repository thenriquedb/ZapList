import { ITrack } from "@modules/Spotify/entities/Track";

export interface ISpotifyAdapter {
  searchTracks(query: string): Promise<ITrack[]>;
  addTracksToPlaylist(trackUri: string): Promise<void>;
}
