import { faker } from "@faker-js/faker";
import { ITrack } from "@modules/Spotify/entities/Track";

export function generateFakeTrack(): ITrack {
  return {
    album: faker.lorem.words(),
    artist: faker.helpers.arrayElements([faker.lorem.words()]),
    id: faker.datatype.uuid(),
    name: faker.music.songName(),
    previewUrl: faker.internet.url(),
    uri: faker.internet.url(),
    duration: faker.datatype.number(),
  };
}

export function generateFakeTrackArray(length = 5): ITrack[] {
  const tracks: ITrack[] = [];

  for (let i = 0; i < length; i += 1) {
    tracks.push(generateFakeTrack());
  }

  return tracks;
}
