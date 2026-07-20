import { ConflictError, UnauthorizedError } from "../errors/errors.js";
import repository from "../repositories/therapist.repository.js";
import settings from "../utils/therapistSettings.js"
import generateTokens from "../utils/generateTokens.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    async create(data) {
        const { confirmPassword, ...therapistData } = data;
        const therapistExists = await repository.find({ email: therapistData.email });
        if(therapistExists) {
            throw new ConflictError("Terapeuta já cadastrado");
        }
        therapistData.password = await bcrypt.hash(therapistData.password, 10);
        const newTherapist = await repository.create({ ...therapistData, ...settings });
        
        const tokens = generateTokens(newTherapist.id);

        await repository.update(
            newTherapist.id,
            { refreshToken: tokens.refreshToken }
        );

        return {
            message: `Usuário ${therapistData.name} cadastrado com sucesso`,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            therapist: {
                id: newTherapist.id,
                name: therapistData.name,
                email: therapistData.email
            }
        };
    }

    async login(data) {
        const { email, password } = data;
        const therapist = await repository.find({ email: email });
        const validPassword = await bcrypt.compare(password, therapist.password);
        if(!therapist || !validPassword) {
            throw new UnauthorizedError("Email ou senha inválidos");
        }

        const tokens = generateTokens(therapist.id);

        await repository.update(
            therapist.id,
            { refreshToken: tokens.refreshToken },
        );

        return {
            message: `Usuário logado com sucesso`,
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async refresh(auth){
        if(!auth)
            throw new UnauthorizedError("Token não encontrado");
        const [type, token] = auth.split(" ");
        if(type !== "Bearer" || !token) {
            throw new UnauthorizedError("Token inválido");
        }
        try{
            var decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        }catch{
            throw new UnauthorizedError("Token inválido");
        }
        const therapist = await repository.find({ id: decoded.id })
        if(!therapist || token !== therapist.refreshToken)
            throw new UnauthorizedError("Token inválido");

        const tokens = generateTokens(therapist.id);

        await repository.update(therapist.id, { refreshToken: tokens.refreshToken });

        return {
            message: `Usuário logado com sucesso`,
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
}

export default new AuthService();