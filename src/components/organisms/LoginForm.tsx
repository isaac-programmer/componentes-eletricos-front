"use client";

import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/domain/schemas/authenticationSchema";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="space-y-1">
        <label htmlFor="login">E-mail ou Usuário</label>
        <input
          id="login"
          type="text"
          {...register("login")}
          placeholder="Informe o seu e-mail ou usuário"
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
        />
        {errors.login && <p className="text-red-600 text-xs mt-1">{errors.login.message}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="password">Senha</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Informe a sua senha"
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

      <div className="flex flex-col items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
        >
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          <span className={clsx({ "invisible": isSubmitting })}>
            Acessar
          </span>
        </button>
      </div>
    </form>
  );
}