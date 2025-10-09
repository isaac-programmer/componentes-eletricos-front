import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, "Informe o e-mail ou o nome de usuário"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type LoginRequest = { email: string; password: string } | { username: string; password: string };