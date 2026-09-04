import { z } from "zod";

const gameSchema = {
  create: z.object({
    name: z.string({ required_error: "O nome é obrigatório." }).min(1).max(255),
    difficulty: z.enum(["easy", "medium", "hard"]),
    description: z.string().optional(),
    skills: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }),

  update: z.object({
    name: z.string().min(1).max(255).optional(),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
    description: z.string().optional(),
    skills: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
  }),

  appendSkill: z.object({
    skillId: z.string({ required_error: "O skillId é obrigatório." }),
  }),

  appendCategory: z.object({
    categoryId: z.string({ required_error: "O categoryId é obrigatório." }),
  }),
};

export default gameSchema;
