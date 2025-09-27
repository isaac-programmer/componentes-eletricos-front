import { z } from "zod";

export const addStockSchema = z.object({
  quantity: z.coerce.number().int().positive("A quantidade deve ser maior que zero"),
});
export type AddStockFormData = z.infer<typeof addStockSchema>;

export const consumeStockSchema = z.object({
  quantity: z.coerce.number().int().positive("A quantidade deve ser maior que zero"),
});
export type ConsumeStockFormData = z.infer<typeof consumeStockSchema>;

export const transferStockSchema = z.object({
  quantity: z.coerce.number().int().positive("A quantidade deve ser maior que zero"),
  toLaboratoryId: z.uuid("Selecione um laboratório de destino"),
});
export type TransferStockFormData = z.infer<typeof transferStockSchema>;