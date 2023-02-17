import express from "express";
import "express-async-errors";

import { SpotifyWebApi } from "@shared/infra/spotify";
import { errorHandler } from "@shared/infra/https/middlewares/errorHandler";

import { whatsappRoutes } from "./routes/whatsapp.routes";

const app = express();

app.use(whatsappRoutes);
app.use(errorHandler);
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  SpotifyWebApi.authorizationCodeGrant();
  setInterval(SpotifyWebApi.refreshToken, 1000 * 60 * 59);
}

app.listen(3000, () => console.log("Server is running"));
