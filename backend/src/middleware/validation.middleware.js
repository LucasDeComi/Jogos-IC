import AppError from "../errors/AppError.js";

class Validation {
    body(schema) {
        return (req, res, next) => {
            const result = schema.safeParse(req.body) // Retorna um objeto que indica sucesso e dados ou erros ao transformar os dados num schema predefinido
            if(!result.success) {
                const formatedErrors = result.error.issues.map(issue => ({
                    field: issue.path[0] ?? "unknown",
                    message: issue.message
                }));
                return next(new AppError("Erro de validação nos campos", 400, formatedErrors));
            }
            req.body = result.data;
            next();
        }
    }
}

export default new Validation();