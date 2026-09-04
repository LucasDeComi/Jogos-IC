import { z } from "zod";

const skillSchema = {
  create: z.object({
    name: z.string({ required_error: "O nome é obrigatório." }).min(1).max(255),
    categoryId: z.string().optional(),
  }),

  update: z.object({
    name: z.string().min(1).max(255).optional(),
    categoryId: z.string().optional(),
  }),
};

export default skillSchema;
