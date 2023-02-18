import { BotResponseCode } from "@shared/core/response-code/BotResponseCode";

export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly responseCode?: BotResponseCode;

  constructor(message: string, statusCode = 400, responseCode: BotResponseCode = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.responseCode = responseCode;
  }
}
