import SpotifyWebApiNode from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

export class SpotifyWebApi {
  private static instance: SpotifyWebApiNode = null;

  static getInstance() {
    if (this.instance == null) {
      this.instance = new SpotifyWebApiNode({
        accessToken: process.env.SPOTIFY_ACCESS_TOKEN,
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
        redirectUri: "http://google.com/",
      });
    }

    return this.instance;
  }
}
