import AppError from "../errors/AppError.js";
import { UnauthorizedError } from "../errors/errors.js";
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw new UnauthorizedError("Token não encontrado");
    }
    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new UnauthorizedError("Token inválido");
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        if(error.name == "TokenExpiredError") {
            throw new AppError("Token expirado. Renove com refresh token", 401, error.name);
        }
        throw new UnauthorizedError("Token inválido");
    }
}