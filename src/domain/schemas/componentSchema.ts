import { z } from "zod";

export const componentSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  reference: z.string().optional(),
  origin: z.string().min(1, "A origem é obrigatória"),
  description: z.string().optional(),
});

export type ComponentFormData = z.infer<typeof componentSchema>;