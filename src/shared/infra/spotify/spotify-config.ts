import SpotifyWebApiNode from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

export class SpotifyWebApi {
  private static instance: SpotifyWebApiNode = null;
  private static tokenExpirationEpoch: number;
  private static numberOfTimesUpdated: number;

  static getInstance(): SpotifyWebApiNode {
    if (this.instance == null) {
      const isProduction = process.env.NODE_ENV === "production";
      const accessToken = isProduction ? null : process.env.SPOTIFY_ACCESS_TOKEN;

      this.instance = new SpotifyWebApiNode({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: "http://google.com/",
        accessToken,
      });
    }

    return this.instance;
  }

  static async authorizationCodeGrant() {
    const code = process.env.SPOTIFY_CODE;

    try {
      const data = await this.getInstance().authorizationCodeGrant(code);
      this.getInstance().setAccessToken(data.body.access_token);
      this.getInstance().setRefreshToken(data.body.refresh_token);

      // Save the amount of seconds until the access token expired
      this.tokenExpirationEpoch = new Date().getTime() / 1000 + data.body.expires_in;
      console.log(
        `Retrieved token. It expires in ${Math.floor(
          this.tokenExpirationEpoch - new Date().getTime() / 1000
        )} seconds!`
      );
    } catch (error) {
      console.log({ error });

      console.log(
        "Something went wrong when retrieving the access token!",
        error.message
      );
    }
  }

  static async refreshToken() {
    console.log(
      `Time left: ${Math.floor(
        this.tokenExpirationEpoch - new Date().getTime() / 1000
      )} seconds left!`
    );

    // OK, we need to refresh the token. Stop printing and refresh.
    if (++this.numberOfTimesUpdated > 5) {
      // Refresh token and print the new time to expiration.

      try {
        const data = await SpotifyWebApi.getInstance().refreshAccessToken();
        this.tokenExpirationEpoch = new Date().getTime() / 1000 + data.body.expires_in;

        console.log(
          `Refreshed token. It now expires in ${Math.floor(
            this.tokenExpirationEpoch - new Date().getTime() / 1000
          )} seconds!`
        );
      } catch (error) {
        console.log("Could not refresh the token!", error.message);
      }
    }
  }
}
