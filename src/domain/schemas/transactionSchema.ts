import { z } from "zod";

const isNumeric = (val: unknown) => val !== null && val !== '' && !isNaN(Number(val));

export const addStockSchema = z.object({
  quantity: z
    .any()
    .refine(isNumeric, {
      message: "Por favor, informe um número válido",
    })
    .transform(Number)
    .pipe(z.number()
      .int({ message: "A quantidade deve ser um número inteiro" })
      .positive({ message: "A quantidade deve ser maior que zero" })
    ),
});
export type AddStockFormData = z.infer<typeof addStockSchema>;

export const consumeStockSchema = z.object({
  quantity: z
    .any()
    .refine(isNumeric, {
      message: "Por favor, informe um número válido",
    })
    .transform(Number)
    .pipe(z.number()
      .int({ message: "A quantidade deve ser um número inteiro" })
      .positive({ message: "A quantidade deve ser maior que zero" })
    ),
  motive: z.string().min(1, "Selecione o motivo do consumo"),
});
export type ConsumeStockFormData = z.infer<typeof consumeStockSchema>;


export const transferStockSchema = z.object({
  quantity: z
    .any()
    .refine(isNumeric, {
      message: "Por favor, informe um número válido",
    })
    .transform(Number)
    .pipe(z.number()
      .int({ message: "A quantidade deve ser um número inteiro" })
      .positive({ message: "A quantidade deve ser maior que zero" })
    ),
  laboratoryDestinationId: z.uuid("Selecione o laboratório de destino"),
});
export type TransferStockFormData = z.infer<typeof transferStockSchema>;