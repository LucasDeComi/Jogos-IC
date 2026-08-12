import AppError from "../errors/AppError.js";
import { UnauthorizedError } from "../errors/errors.js";
import jwt from "jsonwebtoken";

// Middleware para autenticação de terapeuta
export function authTherapist(req, res, next) {
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
        if (decoded.userType === 'patient') {
            throw new UnauthorizedError("Acesso restrito a terapeutas");
        }
        req.userID = decoded.id;
        req.userType = 'therapist';
        next();
    } catch (error) {
        if(error.name == "TokenExpiredError") {
            throw new AppError("Token expirado. Renove com refresh token", 401, error.name);
        }
        throw new UnauthorizedError("Token inválido");
    }
}

// Middleware para autenticação de paciente
export function authPatient(req, res, next) {
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
        if (decoded.userType !== 'patient') {
            throw new UnauthorizedError("Acesso restrito a pacientes");
        }
        req.userID = decoded.id;
        req.userType = 'patient';
        req.therapistId = decoded.therapistId;
        next();
    } catch (error) {
        if(error.name == "TokenExpiredError") {
            throw new AppError("Token expirado. Renove com refresh token", 401, error.name);
        }
        throw new UnauthorizedError("Token inválido");
    }
}

// Middleware genérico (aceita ambos terapeutas e pacientes)
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
        req.userID = decoded.id;
        
        // Diferenciar entre terapeuta e paciente
        if (decoded.userType === 'patient') {
            req.userType = 'patient';
            req.therapistId = decoded.therapistId;
        } else {
            req.userType = 'therapist';
        }
        
        next();
    } catch (error) {
        if(error.name == "TokenExpiredError") {
            throw new AppError("Token expirado. Renove com refresh token", 401, error.name);
        }
        throw new UnauthorizedError("Token inválido");
    }
}