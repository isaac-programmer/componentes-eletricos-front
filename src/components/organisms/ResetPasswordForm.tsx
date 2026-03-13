"use client";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordFormData, resetPasswordSchema } from "@/domain/schemas/passwordRecoverySchema";

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ResetPasswordForm({ onSubmit, isSubmitting }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="password">Nova Senha</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Informe a nova senha"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-placeholder" /> : <Eye className="h-5 w-5 text-placeholder" />}
          </button>
        </div>
        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirme a nova senha"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-placeholder" /> : <Eye className="h-5 w-5 text-placeholder" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex flex-1 w-full justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
        >
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          <span className={clsx({ "invisible": isSubmitting })}>
            Redefinir Senha
          </span>
        </button>
      </div>
    </form>
  );
}
