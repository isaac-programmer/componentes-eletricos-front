import { z } from "zod";

export const componentSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  reference: z.string().min(1, "A referência é obrigatória"),
  origin: z.string().min(1, "A origem é obrigatória"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Selecione uma categoria."),
});

export type ComponentFormData = z.infer<typeof componentSchema>;