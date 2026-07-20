import service from "../services/auth.service.js"

class AuthController {
    async create(req, res) {
        const therapist = await service.create(req.body);
        res.status(201).json(therapist);
    }

    async login(req, res) {
        const result = await service.login(req.body);
        res.status(201).json(result)
    }

    async refresh(req, res) {
        const result = await service.refresh(req.headers.authorization);
        res.status(201).json(result);
    }
}

export default new AuthController();