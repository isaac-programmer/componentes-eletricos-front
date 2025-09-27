"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addStockSchema, AddStockFormData } from "@/domain/schemas/transactionSchema";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface AddStockFormProps {
    onSubmit: (data: AddStockFormData) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function AddStockForm({ onSubmit, isSubmitting }: AddStockFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<AddStockFormData>({
        resolver: zodResolver(addStockSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    type="number"
                    min={0}
                    {...register("quantity", { valueAsNumber: true })}
                    placeholder="Informe a quantidade a ser adicionada"
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                />
                {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity.message}</p>}
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
                        Adicionar
                    </span>
                </button>
            </div>
        </form>
    );
}