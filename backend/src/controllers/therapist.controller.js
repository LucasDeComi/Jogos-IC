import service from "../services/therapist.service.js";

class TherapistController {
  async findById(req, res) {
    const id = req.params.id;
    const therapist = await service.findById(req.userID);
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

  async updateEmail(req, res) {
    const therapist = await service.updateEmail(req.userID, req.body);
    res.status(201).json(therapist);
  }

  async updatePassword(req, res) {
    const therapist = await service.updatePassword(req.userID, req.body);
    res.status(201).json(therapist);
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

export default new TherapistController();
