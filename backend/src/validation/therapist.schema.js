import { z } from "zod"

const therapistSchema = z.object({
    updateEmail: z.object({
        currentEmail: z
            .email({ message: "Informe um e-mail válido." })
            .trim()
            .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
        newEmail: z
            .email({ message: "Informe um e-mail válido." })
            .trim()
            .max(255, { message: "O e-mail deve ter no máximo 255 caracteres." }),
    }).refine((data) => data.currentEmail !== data.newEmail, {
        message: "O novo e-mail não pode ser o e-mail antigo",
        path: ["newEmail"],
    }),

    updatePassword: z.object({
        newPassword: z
            .string({ required_error: "A senha é obrigatória." })
            .min(4, { message: "A senha deve ter, no mínimo, 4 caracteres." })
            .max(70, { message: "A senha é muito longa." }),
    }),
    
    updateSettings: z.object({
        theme: z.enum(["light", "dark", "auto"]).optional(),
        style: z.enum(["standard", "compact", "elegant"]).optional(),
        contrast: z.boolean().optional(),
        itemsSize: z.enum(["small", "medium", "large"]).optional()
    })
});

export default therapistSchema;