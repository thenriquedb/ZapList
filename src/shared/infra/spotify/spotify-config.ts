import SpotifyWebApiNode from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

export class SpotifyWebApi {
  private static instance: SpotifyWebApiNode = null;
  private static tokenExpirationEpoch: number;

  static getInstance(): SpotifyWebApiNode {
    if (this.instance == null) {
      const isProduction = process.env.NODE_ENV === "production";
      const accessToken = isProduction ? undefined : process.env.SPOTIFY_ACCESS_TOKEN;

      this.instance = new SpotifyWebApiNode({
        clientId: process.env.SPOTIFY_CLIENT_ID.trim(),
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET.trim(),
        redirectUri: "http://google.com/",
        accessToken,
      });
    }

    return this.instance;
  }

  static async authorizationCodeGrant() {
    const code = process.env.SPOTIFY_CODE.trim();

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
      throw new Error(
        `Something went wrong when retrieving the access token! ${error.message}`
      );
    }
  }

  static async refreshToken() {
    setInterval(async () => {
      const timeLeft = this.tokenExpirationEpoch - new Date().getTime() / 1000;
      const timeLeftInteger = Math.floor(timeLeft);
      console.log(`Time left: ${timeLeftInteger} seconds left!`);

      // Refresh the token when it has two minutes left
      if (timeLeftInteger === 120) {
        try {
          const data = await this.getInstance().refreshAccessToken();
          this.tokenExpirationEpoch = Math.floor(
            new Date().getTime() / 1000 + data.body.expires_in
          );

          const expiresIn = this.tokenExpirationEpoch - new Date().getTime() / 1000;

          console.log(
            `Refreshed token. It now expires in ${Math.floor(expiresIn)} seconds!`
          );
        } catch (error) {
          throw new Error(`Could not refresh the token! ${error.message}`);
        }
      }
    }, 1000);
  }
}
