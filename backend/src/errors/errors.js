import AppError from "./AppError.js";

export class UnauthorizedError extends AppError {
    constructor(message = "Não autorizado") {
        super(message, 401);
    }
}

export class ConflictError extends AppError {
  constructor(message = "Conflito de dados") {
    super(message, 409);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}