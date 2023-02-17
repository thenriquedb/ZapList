import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 400, data);
  }
}
