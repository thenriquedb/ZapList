import express, { Express } from "express";
import "express-async-errors";

import { SpotifyWebApi } from "@shared/infra/spotify";
import { errorHandler } from "@shared/infra/http/middlewares/errorHandler";

import { routes } from "./routes/index.routes";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
  }

  async run() {
    this.app.use(routes);
    this.app.use(errorHandler);
    this.app.use(express.json());

    if (process.env.NODE_ENV === "production") {
      console.log("Run in production");
      SpotifyWebApi.authorizationCodeGrant();
      setInterval(() => SpotifyWebApi.refreshToken(), 1000);
    }

    this.app.listen(3000, () => console.log("Server is running"));
  }
}
