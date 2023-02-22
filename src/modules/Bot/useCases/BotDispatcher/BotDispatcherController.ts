import { Request, Response } from "express";
import twilio from "twilio";

import { BotResponseCode } from "@shared/core/response-code/BotResponseCode";
import { ITrack } from "@modules/Spotify/entities/ITrack";

import botDispatcherUseCaseFactory from "../../factories/BotManagerFactory";

interface IRequest {
  SmsMessageSid: string;
  NumMedia: string;
  ProfileName: string;
  SmsSid: string;
  WaId: string;
  SmsStatus: string;
  Body: string;
  To: string;
  NumSegments: string;
  ReferralNumMedia: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
}

const botManagerUseCase = botDispatcherUseCaseFactory();

export class BotManagerRequestController {
  private formatSearchTracks(tracks: ITrack[]) {
    const LINE_BREAK = "\n";
    const message = [""];

    tracks.forEach((track, index) => {
      const firstLine = `*${index + 1}) ${track.name}*`;
      const secondLine = `*Artista*: ${track.artist[0]}`;
      const thirdLine = `*Albúm*: ${track.album}`;
      const fourLine = `*Prévia*: ${track.previewUrl}`;

      message.push(firstLine);
      message.push(secondLine);
      message.push(thirdLine);
      message.push(fourLine);
      message.push(LINE_BREAK);
    });

    return message.join(LINE_BREAK);
  }

  async handle(request: Request<unknown, unknown, IRequest>, response: Response) {
    const message = request.body.Body;
    const defaultMessage = `Seja bem vindo(a) ao Zapfy! Adicione músicas em sua playlist diretamente pelo Whatsapp!. O bot tem suporte aos seguintes comandos:\n\n*buscar <nome-da-faixa>*\n*add <id-da-faxa>*\n*historico*`;

    const botManagerResponse = await botManagerUseCase.execute(
      message,
      request.body.WaId
    );

    let whatsappMessage = "";

    switch (botManagerResponse.code) {
      case BotResponseCode.ADDED_HISTORY_EMPTY:
        whatsappMessage = "Você ainda não adicionou nenhuma faixa a playlist";
        break;

      case BotResponseCode.LIST_HISTORY_SUCCESSFUL:
        whatsappMessage = this.formatSearchTracks(botManagerResponse.data);
        break;

      case BotResponseCode.TRACK_ADDED_TO_PLAYLIST_SUCCESSFUL:
        whatsappMessage = `A faixa ${botManagerResponse.data.name} foi adicionada com sucesso a playlist!`;
        break;

      case BotResponseCode.TRACK_ALREADY_ADDED_ON_PLAYLIST:
        whatsappMessage = `A faixa ${botManagerResponse.data.name} já foi adiciona a playlist.`;
        break;

      case BotResponseCode.INVALID_SEARCH_TRACK_SYNTAX:
        whatsappMessage = `Ops, parece que você esqueceu de enviar o termo da busca junto com o comando.\n*buscar <termo>*`;
        break;

      case BotResponseCode.INVALID_ADD_TRACK_SYNTAX:
        whatsappMessage = `Ops, parece que você esqueceu de enviar o código da faixa.\n*add <id>*`;
        break;

      case BotResponseCode.TRACK_NOT_FOUND:
        whatsappMessage = `Não foi possível encontrar nenhum resultado para o termo *${botManagerResponse.data}*`;
        break;

      case BotResponseCode.INVALID_TRACK_ID:
        whatsappMessage = `Não foi possível encontrar nenhuma faixa com o código igual a *${botManagerResponse.data}*`;
        break;

      case BotResponseCode.TRACK_SEARCH_SUCCESSFUL:
        console.log("successful");
        whatsappMessage = this.formatSearchTracks(botManagerResponse.data);
        break;

      default:
        whatsappMessage = defaultMessage;
        break;
    }

    const twiml = new twilio.twiml.MessagingResponse();

    return response.status(201).send(twiml.message(whatsappMessage).toString());
  }
}
