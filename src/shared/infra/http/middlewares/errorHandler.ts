/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import Twilio from "twilio";

import { AppError } from "@shared/core/errors/AppError";

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
      data: err.data,
    });
  }

  const twiml = new Twilio.twiml.MessagingResponse();

  return response.status(201).send(twiml.message(err.message).toString());

  // return response.status(500).json({
  //   status: "error",
  //   message: `Internal server error - ${err.message}`,
  // });
}
