"use client";

import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ConfirmationContentProps {
    onCancel: () => void;
    onConfirm: () => void;
    text: string;
    confirmButtonText?: string;
    isLoading?: boolean;
}

export function ConfirmationContent({
    onCancel,
    onConfirm,
    text,
    isLoading = false,
    confirmButtonText = "Confirmar",
}: ConfirmationContentProps) {
    return (
        <div className="space-y-8">
            <p>{text}</p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-primary bg-white rounded-md hover:bg-white/90 border border-primary"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
                >
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    )}

                    <span className={clsx({ "invisible": isLoading })}>
                        {confirmButtonText}
                    </span>
                </button>
            </div>
        </div>
    );
}