import { beforeEach, describe, expect, it } from "vitest";

import { faker } from "@faker-js/faker";
import {
  generateFakeTrack,
  generateFakeTrackArray,
} from "@fakes/Spotify/generateFakeTrack";

import { BotRepository } from "./BotRepository";

describe("BotRepository", () => {
  let botRepository: BotRepository;

  beforeEach(() => {
    botRepository = new BotRepository();
  });

  it("should save search correctly", () => {
    const waId = faker.phone.number();
    const query = faker.lorem.sentence();
    const tracks = generateFakeTrackArray();

    botRepository.saveSearch(waId, query, tracks);

    const userRegistry = botRepository.getUser(waId);

    expect(userRegistry.search_term).toBe(query);
    expect(userRegistry.search_result).toEqual(tracks);
    expect(userRegistry.added_history).toEqual([]);
  });

  it("should save track on history correctly", () => {
    const waId = faker.phone.number();
    const track = generateFakeTrack();

    botRepository.saveTrackOnHistory(waId, track);

    expect(botRepository.listTracksAddedHistory(waId)).toEqual([track]);
  });

  it("should return user with default values correctly", () => {
    const waId = faker.phone.number();

    expect(botRepository.getUser(waId)).toEqual({
      search_term: "",
      search_result: [],
      added_history: [],
    });
  });
});
