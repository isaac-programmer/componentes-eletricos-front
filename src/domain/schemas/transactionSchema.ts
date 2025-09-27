import { z } from "zod";

export const addStockSchema = z.object({
  quantity: z.string(),
});
export type AddStockFormData = z.infer<typeof addStockSchema>;

export const consumeStockSchema = z.object({
  quantity: z.string(),
});
export type ConsumeStockFormData = z.infer<typeof consumeStockSchema>;

export const transferStockSchema = z.object({
  quantity: z.string(),
  toLaboratoryId: z.uuid("Selecione um laboratório de destino"),
});
export type TransferStockFormData = z.infer<typeof transferStockSchema>;