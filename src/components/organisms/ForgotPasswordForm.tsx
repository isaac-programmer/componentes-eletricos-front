"use client";

import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/domain/schemas/passwordRecoverySchema";

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ForgotPasswordForm({ onSubmit, isSubmitting }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Informe o seu e-mail"
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex justify-center flex-1 w-full items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
        >
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          <span className={clsx({ "invisible": isSubmitting })}>
            Enviar Nova Senha
          </span>
        </button>
      </div>
    </form>
  );
}
