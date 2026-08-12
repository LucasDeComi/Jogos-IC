import { NotFoundError, ConflictError } from "../errors/errors.js";
import repository from "../repositories/therapist.repository.js";
import patientRepository from "../repositories/patient.repository.js";
import bcrypt from "bcrypt"
import userSafe from "../utils/userSafe.js";
import { FieldValue } from "firebase-admin/firestore";


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

    async appendPatient(id, data) {
        const therapist = await repository.find({ id: id });
        const patientRef = patientRepository.getRef(data.patientId);

        const isAssociated = therapist.patients?.some(
            (ref) => ref.path === patientRef.path
        );

        if (isAssociated) {
            throw new ConflictError("O paciente já está associado com o terapeuta");
        }
        
        return await repository.update(id, { patients: FieldValue.arrayUnion(patientRef) });
    }

    async removePatient(therapistId, patientId) {
        const patientRef = patientRepository.getRef(patientId);
        const therapist = await repository.find({ id: therapistId });

        const isAssociated = therapist.patients?.some(
            (ref) => ref.path === patientRef.path
        );

        if (!isAssociated) {
            throw new NotFoundError("O paciente não está associado com o terapeuta");
        }

        return repository.update(therapistId, { patients: FieldValue.arrayRemove(patientRef) });
    }

    async delete(id) {
        return await repository.delete(id);
    }
}

export default new TherapistService();