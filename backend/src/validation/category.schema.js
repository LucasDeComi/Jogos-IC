import { z } from "zod";

const categorySchema = {
  create: z.object({
    name: z.string({ required_error: "O nome é obrigatório." }).min(1).max(255),
  }),

  update: z.object({
    name: z.string().min(1).max(255).optional(),
  }),
};

export default categorySchema;
