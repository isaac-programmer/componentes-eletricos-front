import { z } from 'zod';

// Definimos o "formato" e as regras para os dados do nosso formulário
export const componenteSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  reference: z.string().optional(),
  origin: z.string().min(1, 'A origem é obrigatória.'),
  description: z.string().optional(),
});

// Extraímos o tipo TypeScript diretamente do schema. Isso é mágico!
// Agora não precisamos manter dois tipos (um para Zod, outro para TS).
export type ComponenteFormData = z.infer<typeof componenteSchema>;