import { beforeEach, describe, expect, it } from "vitest";

import { SpotifyAdapterMock, apiMock } from "@fakes/shared/infra/SpotifyAdapterMock";
import { BotRepository } from "@modules/Bot/repositories/implementations/BotRepository";
import { faker } from "@faker-js/faker";
import { BotResponseCode } from "@shared/core/response-code/BotResponseCode";

import { BotDispatcherUseCase } from "./BotDispatcherUseCase";

describe("BotManagerUseCase", () => {
  let botManagerUseCase: BotDispatcherUseCase;

  beforeEach(() => {
    const spotifyAdapter = new SpotifyAdapterMock();
    const botRepository = new BotRepository();
    botManagerUseCase = new BotDispatcherUseCase(spotifyAdapter, botRepository);
  });

  it("should return correct code when invalid input is sended", async () => {
    const command = "invalid-commandd";
    const waId = faker.phone.number();

    const response = await botManagerUseCase.execute(command, waId);

    expect(response).toEqual({
      code: BotResponseCode.INVALID_INPUT,
      data: command,
    });
  });

  it("should return correct code when 'buscar'' command with invalid syntax", async () => {
    const command = "buscar";
    const waId = faker.phone.number();

    const response = await botManagerUseCase.execute(command, waId);

    expect(response).toEqual({
      code: BotResponseCode.INVALID_SEARCH_TRACK_SYNTAX,
      data: null,
    });
  });

  it("should return correct code when use 'add' command with invalid syntax", async () => {
    const command = "add";
    const waId = faker.phone.number();

    const response = await botManagerUseCase.execute(command, waId);

    expect(response).toEqual({
      code: BotResponseCode.INVALID_ADD_TRACK_SYNTAX,
      data: null,
    });
  });

  it("should return tracks array when use 'buscar' command", async () => {
    const command = "buscar emicida";
    const waId = faker.phone.number();

    const response = await botManagerUseCase.execute(command, waId);

    expect(response).toEqual({
      code: BotResponseCode.TRACK_SEARCH_SUCCESSFUL,
      data: apiMock.tracks.emicida,
    });
  });

  it("should return correctly code when searched track is not found", async () => {
    const command = "buscar invalid-track";
    const waId = faker.phone.number();

    const response = await botManagerUseCase.execute(command, waId);

    expect(response).toEqual({
      code: BotResponseCode.TRACK_NOT_FOUND,
      data: "invalid-track",
    });
  });

  it("should return empty array when added track history is empty", async () => {
    const command = "historico";
    const waId = faker.phone.number();

    const response = await botManagerUseCase.execute(command, waId);

    expect(response).toEqual({
      code: BotResponseCode.ADDED_HISTORY_EMPTY,
      data: [],
    });
  });

  it("should add track to playlist correctly", async () => {
    const searchCommand = "buscar emicida";

    const trackId = 2;
    const addCommand = `adicionar ${trackId}`;

    const waId = faker.phone.number();

    const searchResponse = await botManagerUseCase.execute(searchCommand, waId);
    const addResponse = await botManagerUseCase.execute(addCommand, waId);

    expect(addResponse).toEqual({
      code: BotResponseCode.TRACK_ADDED_TO_PLAYLIST_SUCCESSFUL,
      data: searchResponse.data[trackId - 1],
    });
  });

  it("should list added history correctly", async () => {
    const waId = faker.phone.number();

    const searchResponse = await botManagerUseCase.execute("buscar racionais", waId);
    await botManagerUseCase.execute(`adicionar 2`, waId);
    await botManagerUseCase.execute(`adicionar 3`, waId);
    await botManagerUseCase.execute(`adicionar 4`, waId);
    const response = await botManagerUseCase.execute("historico", waId);

    expect(response).toEqual({
      code: BotResponseCode.LIST_HISTORY_SUCCESSFUL,
      data: [searchResponse.data[1], searchResponse.data[2], searchResponse.data[3]],
    });
  });

  it("should return correct code when try added track with invalid id", async () => {
    const trackId = 10;
    const addCommand = `adicionar ${trackId}`;

    const waId = faker.phone.number();

    const addResponse = await botManagerUseCase.execute(addCommand, waId);

    expect(addResponse).toEqual({
      code: BotResponseCode.INVALID_TRACK_ID,
      data: String(trackId),
    });
  });

  it("should return correct code when try added duplicate track", async () => {
    const trackId = 2;
    const searchCommand = "buscar emicida";
    const addCommand = `adicionar ${trackId}`;

    const waId = faker.phone.number();

    const searchResponse = await botManagerUseCase.execute(searchCommand, waId);
    await botManagerUseCase.execute(addCommand, waId);
    const addResponse = await botManagerUseCase.execute(addCommand, waId);

    expect(addResponse).toEqual({
      code: BotResponseCode.TRACK_ALREADY_ADDED_ON_PLAYLIST,
      data: searchResponse.data[trackId - 1],
    });
  });
});
