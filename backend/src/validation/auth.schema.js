import { z } from "zod"

const authSchema = z.object({
    registerTherapist: z.object({
        name: z
            .string({ required_error: "O nome é obrigatório." })
            .trim()
            .min(1, { message: "O nome é obrigatório." })
            .max(80, { message: "O nome deve ter, no máximo, 80 caracteres." }),
        email: z
            .email({ message: "Informe um e-mail válido.", error: "O e-mail é obrigatório." })
            .trim()
            .max(255, { message: "O e-mail deve ter, no máximo, 255 caracteres." }),
        password: z
            .string({ required_error: "A senha é obrigatória." })
            .min(4, { message: "A senha deve ter, no mínimo, 4 caracteres." })
            .max(70, { message: "A senha é muito longa." }),
        confirmPassword: z.string({ required_error: "Confirme sua senha." })
    }).refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    }),

    loginTherapist: z.object({
        email: z
            .email({ message: "Informe um e-mail válido.", error: "O e-mail é obrigatório." })
            .trim()
            .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
        password: z
            .string({ required_error: "A senha é obrigatória." })
            .min(4, { message: "A senha deve ter, no mínimo, 4 caracteres." })
            .max(70, { message: "A senha é muito longa." }),
    })
});

export default authSchema;