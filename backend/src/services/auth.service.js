import { ConflictError, UnauthorizedError } from "../errors/errors.js";
import therapistRepository from "../repositories/therapist.repository.js";
import patientRepository from "../repositories/patient.repository.js";
import settings from "../utils/therapistSettings.js"
import generateTokens from "../utils/generateTokens.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    // ===== TERAPEUTA =====
    async createTherapist(data) {
        const { confirmPassword, ...therapistData } = data;
        const therapistExists = await therapistRepository.find({ email: therapistData.email });
        if(therapistExists) {
            throw new ConflictError("Terapeuta já cadastrado");
        }
        therapistData.password = await bcrypt.hash(therapistData.password, 10);
        const newTherapist = await therapistRepository.create({ ...therapistData, ...settings, patients: [] });

        const tokens = generateTokens(newTherapist.id);

        await therapistRepository.update(
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

    async loginTherapist(data) {
        const { email, password } = data;
        const therapist = await therapistRepository.find({ email: email });
        if(!therapist) {
            throw new UnauthorizedError("Email ou senha inválidos");
        }
        const validPassword = await bcrypt.compare(password, therapist.password);
        if(!validPassword) {
            throw new UnauthorizedError("Email ou senha inválidos");
        }

        const tokens = generateTokens(therapist.id);

        await therapistRepository.update(
            therapist.id,
            { refreshToken: tokens.refreshToken },
        );

        return {
            message: `Usuário logado com sucesso`,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async refreshTherapist(auth){
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
        const therapist = await therapistRepository.find({ id: decoded.id })
        if(!therapist || token !== therapist.refreshToken)
            throw new UnauthorizedError("Token inválido");

        const tokens = generateTokens(therapist.id);

        await therapistRepository.update(therapist.id, { refreshToken: tokens.refreshToken });

        return {
            message: `Usuário logado com sucesso`,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    // ===== PACIENTE =====
    async createPatient(therapistId, data) {
        const { name } = data;
        const qrToken = this.generateQRToken();

        const newPatient = await patientRepository.create({
            name,
            therapistId,
            qrToken,
            createdAt: new Date(),
        });

        return {
            message: `Paciente ${name} cadastrado com sucesso`,
            patient: {
                id: newPatient.id,
                name: newPatient.name,
                therapistId,
                qrToken
            }
        };
    }

    async loginPatient(data) {
        const { qrToken, therapistId } = data;
        
        // Buscar paciente pelo qrToken e therapistId
        const patient = await patientRepository.find({ 
            qrToken, 
            therapistId 
        });
        
        if (!patient) {
            throw new UnauthorizedError("Token inválido ou paciente não encontrado");
        }

        // Gerar tokens com userType diferenciado
        const tokens = generateTokens(patient.id, { 
            userType: 'patient',
            therapistId: therapistId 
        });

        return {
            message: `Paciente ${patient.name} logado com sucesso`,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            patient: {
                id: patient.id,
                name: patient.name,
                therapistId: therapistId
            }
        };
    }

    async refreshPatient(auth) {
        if (!auth)
            throw new UnauthorizedError("Token não encontrado");
        
        const [type, token] = auth.split(" ");
        if (type !== "Bearer" || !token) {
            throw new UnauthorizedError("Token inválido");
        }
        
        try {
            var decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        } catch {
            throw new UnauthorizedError("Token inválido");
        }

        if (decoded.userType !== 'patient') {
            throw new UnauthorizedError("Token não é de um paciente");
        }

        const patient = await patientRepository.find({ id: decoded.id });
        if (!patient) {
            throw new UnauthorizedError("Paciente não encontrado");
        }

        const tokens = generateTokens(patient.id, {
            userType: 'patient',
            therapistId: decoded.therapistId
        });

        return {
            message: `Token renovado com sucesso`,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    // ===== UTILITÁRIO =====
    generateQRToken() {
        return Math.random().toString(36).substring(2, 18).toUpperCase();
    }
}

export default new AuthService();