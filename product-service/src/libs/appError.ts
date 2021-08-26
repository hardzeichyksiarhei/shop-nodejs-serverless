export class AppError extends Error {
  statusCode: number;

  status: string;

  code: string;

  isOperational: boolean;

  constructor(message: string = "", statusCode: number, code: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "FAIL" : "ERROR";
    this.code = code;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not found", code: string = "NOT_FOUND") {
    super(message, 404, code);
  }
}
