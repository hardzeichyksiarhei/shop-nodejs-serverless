import { ValidationError } from "class-validator";

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

export class AppValidationError extends AppError {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("Validation error", 400, "VALIDATION_ERROR");

    this.errors = errors;
  }
}
