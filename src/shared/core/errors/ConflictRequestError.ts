import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 401, data);
  }
}
