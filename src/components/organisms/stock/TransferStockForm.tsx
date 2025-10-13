"use client";
import { useForm } from "react-hook-form";
import { transferStockSchema } from "@/domain/schemas/transactionSchema";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetLaboratories } from "@/useCases/useGetLaboratories";

type TransferStockFormData = z.infer<typeof transferStockSchema>;

interface TransferStockFormProps {
    onSubmit: (data: TransferStockFormData) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function TransferStockForm({ onSubmit, isSubmitting }: TransferStockFormProps) {
    const { data: laboratories, isLoading: isLoadingLaboratories } = useGetLaboratories();

    const { register, handleSubmit, formState: { errors } } = useForm<TransferStockFormData>({
        resolver: zodResolver(transferStockSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    min={0}
                    {...register("quantity", { valueAsNumber: true })}
                    type="number"
                    placeholder="Informe a quantidade a ser transferida"
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                />
                {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity.message}</p>}
            </div>
            <div>
                <select
                    {...register("laboratoryDestinationId")}
                    disabled={isLoadingLaboratories}
                    className="w-full px-3 py-2 cursor-pointer border border-border rounded-md text-sm focus:outline-none focus:ring-1 text-gray-500 data-[valid]:text-paragraph"
                >
                    <option value="">{isLoadingLaboratories ? "Carregando..." : "Selecione o laboratório de destino"}</option>
                    {laboratories?.data.map(laboratory => (
                        <option key={laboratory.id} value={laboratory.id}>
                            {laboratory.name}
                        </option>
                    ))}
                </select>
                {errors.laboratoryDestinationId && <p className="text-xs text-red-600 mt-1">{errors.laboratoryDestinationId.message}</p>}
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
                        Transferir
                    </span>
                </button>
            </div>
        </form>
    );
}