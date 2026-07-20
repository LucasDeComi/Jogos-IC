import repository from "../repositories/therapist.repository.js";

class TherapistService {
    async create(data) {
        return await repository.create(data);
    }

    async findById(id) {
        return await repository.find({ id: id });
    }

    async findByEmail(email) {
        return await repository.find({ email: email });
    }

    async findByName(name) {
        return await repository.find({ name: name });
    }

    async update(id, data) {
        return await repository.update(id, data);
    }

    async delete(id) {
        return await repository.delete(id);
    }
}

export default new TherapistService();