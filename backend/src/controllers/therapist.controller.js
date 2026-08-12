import service from "../services/therapist.service.js";

class TherapistController {
  async find(req, res) {
    const result = await service.find(req.query)
    res.status(200).json(result)
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

  async appendPatient(req, res) {
    const result = await service.appendPatient(req.userID, req.body);
    res.status(201).json(result);
  }

  async removePatient(req, res) {
    const result = await service.removePatient(req.userID, req.params.id);
    res.status(204).send();
  }

  async delete(req, res) {
    const response = await service.delete(req.userID);
    res.status(201).json(response);
  }
}

export default new TherapistController();
