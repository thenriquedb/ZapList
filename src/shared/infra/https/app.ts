import express from "express";
import "express-async-errors";
import "reflect-metadata";

// import "@shared/infra/dependency-injection";

import { errorHandler } from "@shared/infra/https/middlewares/errorHandler";

import { whatsappRoutes } from "./routes/whatsapp.routes";

const app = express();

app.use(whatsappRoutes);
app.use(errorHandler);
app.use(express.json());

app.listen(3000, () => console.log("Server is running"));

// app.get("/", async (req, res) => {
//   const userPlaylist = await spotifyApi.getUserPlaylists();

//   const changedPlayListId = userPlaylist.body.items.find(
//     (playlist) => playlist.name === "BOT PLAYLIST"
//   ).id;

//   const response = await spotifyApi.searchTracks("anavitoria", { limit: 5 });

//   const mappedTracks = response.body.tracks.items.map((track, index) => ({
//     index,
//     name: track.name,
//     id: track.id,
//     artist: track.artists.map((artist) => artist.name),
//     uri: track.uri,
//     duration: track.duration_ms,
//     album: track.album.name,
//     preview: track.preview_url,
//   }));

//   const playlistTracks = await spotifyApi.getPlaylistTracks(changedPlayListId);

//   const musicAlreadyAdded = playlistTracks.body.items.find(
//     ({ track }) => track.name === mappedTracks[0].name
//   );

//   if (musicAlreadyAdded) {
//     return res
//       .json({
//         message: "Esta faixa já foi adicionada a playlist e será tocada em breve",
//       })
//       .send();
//   }

//   await spotifyApi.addTracksToPlaylist(changedPlayListId, [mappedTracks[0].uri]);

//   return res.json(mappedTracks).send();
// });

// app.post("/", async (req, res) => {
//   const message = req.body.Body;
//   const tracks = await spotifyApi.searchTracks(message, { limit: 5 });
//   console.log({ tracks: "" });

//   const twiml = new twilio.twiml.MessagingResponse();

//   const albums = await spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE", {
//     limit: 10,
//     offset: 20,
//   });

//   twiml.message(JSON.stringify(albums.body.items));

//   return res.send(twiml.toString());
// });
