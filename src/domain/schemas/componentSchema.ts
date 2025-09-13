import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const componentSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  reference: z.string().min(1, "A referência é obrigatória"),
  origin: z.string().min(1, "A origem é obrigatória"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  image: z.any()
    .optional()
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files instanceof FileList;
      },
      "Formato de arquivo inválido"
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files[0].size <= MAX_FILE_SIZE;
      },
      "O tamanho máximo da imagem é 10MB"
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
      },
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos."
    ),
});

export type ComponentFormData = z.infer<typeof componentSchema>;