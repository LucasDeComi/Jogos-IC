import service from "../services/patient.service.js";

class PatientController {
    async find(req, res) {
        const result = await service.find(req.query)
        res.status(200).json(result)
    }

    async updateSettings(req, res) {
        const therapist = await service.updateSettings(req.userID, req.body);
        res.status(201).json(therapist);
    }

    async delete(req, res) {
        const response = await service.delete(req.userID);
        res.status(201).json(response);
    }
}

export default new PatientController();