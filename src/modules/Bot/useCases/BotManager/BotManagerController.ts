import { Request, Response } from "express";
import twilio from "twilio";

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

export class BotManagerRequestController {
  async handle(request: Request<unknown, unknown, IRequest>, response: Response) {
    const message = request.body.Body;

    const twiml = new twilio.twiml.MessagingResponse();

    const botManagerUseCase = botDispatcherUseCaseFactory();

    const r = await botManagerUseCase.execute(message, request.body.WaId);

    return response.status(201).send(twiml.message(r).toString());
  }
}
