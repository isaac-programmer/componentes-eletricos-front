import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const userSchema = z.object({
  cpf: z.string().min(1, "O CPF é obrigatório"),
  name: z.string().min(1, "O nome é obrigatório"),
  surname: z.string().min(1, "O sobrenome é obrigatório"),
  phone: z.string().optional(),
  email: z.email("O e-mail é inválido").or(z.literal("")).optional(),
  groupId: z.string().min(1, "Selecione um grupo"),
  imageUrl: z.url().optional().nullable(),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  confirmPassword: z.string().min(8, "A confirmação de senha deve ter no mínimo 8 caracteres"),
  avatar: z.any()
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
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos"
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const updateUserSchema = z
  .object({
    cpf: z.string().min(1, "O CPF é obrigatório"),
    name: z.string().min(1, "O nome é obrigatório"),
    surname: z.string().min(1, "O sobrenome é obrigatório"),
    phone: z.string().optional(),
    email: z.email("O e-mail é inválido").or(z.literal("")).optional(),
    groupId: z.string().min(1, "Selecione um grupo"),
    imageUrl: z.url().optional().nullable(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    avatar: z
      .any()
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
        "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos"
      ),
  })
  .refine(
    (data) => {
      // Só valida se a senha foi informada
      if (!data.password && !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  );

export type UserFormData = z.infer<typeof userSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;