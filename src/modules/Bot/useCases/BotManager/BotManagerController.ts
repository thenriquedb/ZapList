import { Request, Response } from "express";
import twilio from "twilio";

import botDispatcherUseCaseFactory from "../../factories/BotManagerFactory";

export class BotManagerRequestController {
  async handle(request: Request, response: Response) {
    const message = request.body.Body;

    const twiml = new twilio.twiml.MessagingResponse();

    const botManagerUseCase = botDispatcherUseCaseFactory();

    const r = await botManagerUseCase.execute(message);

    return response.status(201).send(twiml.message(r).toString());
  }
}
