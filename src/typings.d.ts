declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_CODE: string;
    SPOTIFY_PLAYLIST_NAME: string;
    SPOTIFY_ACCESS_TOKEN: string;
    SPOTIFY_REFRESH_TOKEN: string;
  }
}
