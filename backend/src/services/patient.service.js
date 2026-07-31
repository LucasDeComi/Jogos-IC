import repository from "../repositories/patient.repository.js";
import userSafe from "../utils/userSafe.js";

class PatientService {
    async find(filters) {
        return userSafe(await repository.find(filters));
    }

    async updateSettings(id, data) {
        return await repository.update(id, data);
    }

    async delete(id) {
        return await repository.delete(id);
    }
}

export default new PatientService();