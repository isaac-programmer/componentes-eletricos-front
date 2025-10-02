"use client";
import { useForm } from "react-hook-form";
import { consumeStockSchema } from "@/domain/schemas/transactionSchema";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ConsumeStockFormData = z.infer<typeof consumeStockSchema>;

interface ConsumeStockFormProps {
    onSubmit: (data: ConsumeStockFormData) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function ConsumeStockForm({ onSubmit, isSubmitting }: ConsumeStockFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ConsumeStockFormData>({
        resolver: zodResolver(consumeStockSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    min={0}
                    {...register("quantity", { valueAsNumber: true })}
                    type="number"
                    placeholder="Informe a quantidade a ser consumida"
                    className="w-full px-3 py-2 cursor-pointer border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                />
                {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity.message}</p>}
            </div>
            <div>
                <select
                    {...register("motive")}
                    className="w-full px-3 py-2 cursor-pointer border border-border rounded-md text-sm focus:outline-none focus:ring-1 text-gray-400 data-[valid]:text-paragraph"
                >
                    <option value="">Selecione o motivo do consumo</option>
                    <option value="Queima do Componente">Queima do Componente</option>
                    <option value="Uso Externo à UFC">Uso Externo à UFC</option>
                </select>
                {errors.motive && <p className="text-xs text-red-600 mt-1">{errors.motive.message}</p>}
            </div>
            <div className="md:col-span-3 flex justify-center md:justify-end gap-3 mt-4">
                <button
                    type="submit"
                    className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    )}

                    <span className={clsx({ "invisible": isSubmitting })}>
                        Consumir
                    </span>
                </button>
            </div>
        </form>
    );
}