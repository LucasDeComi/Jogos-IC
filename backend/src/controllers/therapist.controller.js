import service from "../services/therapist.service.js";

class TherapistController {
    async create(req, res) {
        const therapist = await service.create(req.body);
        res.status(201).json(therapist);
    }

    async findById(req, res) {
        const id = req.params.id;
        const therapist = await service.findById(id);
        res.status(200).json(therapist);
    }

    async findByEmail(req, res) {
        const email = req.params.email;
        const therapist = await service.findByEmail(email);
        res.status(200).json(therapist);
    }

    async findByName(req, res) {
        const name = req.params.name;
        const therapist = await service.findByName(name);
        res.status(200).json(therapist);
    }
    
    async update(req, res) {
        const id = req.params.id;
        const therapist = await service.update(id, req.body);
        res.status(201).json(therapist);
    }
    
    async delete(req, res) {
        const id = req.params.id;
        const response = await service.delete(id);
        res.status(201).json(response);
    }
}

export default new TherapistController();