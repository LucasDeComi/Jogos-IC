import AppError from "../errors/AppError.js";

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
}

export default errorHandler;