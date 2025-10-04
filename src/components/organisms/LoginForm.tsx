"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.email("Por favor, informe um e-mail válido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const handleLogin = async (data: LoginFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email">E-mail ou Usuário</label>
        <input 
          id="email" 
          type="email" 
          {...register("email")}
          placeholder="Informe o seu e-mail ou usuário"
          className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1" 
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
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

      <div className="flex flex-col items-center gap-4 pt-4">
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
        <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
          Esqueceu a senha?
        </Link>
      </div>
    </form>
  );
}