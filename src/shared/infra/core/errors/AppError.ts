export class AppError {
  public readonly message: string;
  public readonly data: any;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, data = {}) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
