import service from "../services/auth.service.js"

class AuthController {
    // ===== TERAPEUTA =====
    async createTherapist(req, res) {
        const therapist = await service.createTherapist(req.body);
        res.status(201).json(therapist);
    }

    async loginTherapist(req, res) {
        const result = await service.loginTherapist(req.body);
        res.status(201).json(result)
    }

    async refreshTherapist(req, res) {
        const result = await service.refreshTherapist(req.headers.authorization);
        res.status(201).json(result);
    }

    // ===== PACIENTE =====
    async createPatient(req, res) {
        const result = await service.createPatient(req.userID, req.body);
        res.status(201).json(result);
    }

    async loginPatient(req, res) {
        const result = await service.loginPatient(req.body);
        res.status(200).json(result);
    }

    async refreshPatient(req, res) {
        const result = await service.refreshPatient(req.headers.authorization);
        res.status(200).json(result);
    }
}

export default new AuthController();