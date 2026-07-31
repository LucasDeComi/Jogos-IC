import { NotFoundError, ConflictError } from "../errors/errors.js";
import repository from "../repositories/therapist.repository.js";
import bcrypt from "bcrypt"
import userSafe from "../utils/userSafe.js";


class TherapistService {
    async find(filters) {
        return userSafe(await repository.find(filters));
    }

    async updateEmail(id, data) {
        const { currentEmail, newEmail } = data;
        const theraphist = await repository.find({ email: currentEmail });
        if(!theraphist) {
            throw new NotFoundError("Terapeuta não encontrado");
        }
        const newEmailExists = await repository.find({ email: newEmail });
        if(newEmailExists) {
            throw new ConflictError("O novo email já está sendo usado por outro usuário");
        }
        return await repository.update(id, { email: newEmail });
    }

    async updatePassword(id, data) {
        const { newPassword } = data;
        const password = await bcrypt.hash(newPassword, 10);
        return await repository.update(id, { password: password });
    }

    async updateSettings(id, data) {
        return await repository.update(id, data);
    }

    async delete(id) {
        return await repository.delete(id);
    }
}

export default new TherapistService();