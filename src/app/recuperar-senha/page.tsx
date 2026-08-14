"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ForgotPasswordForm } from "@/components/organisms/ForgotPasswordForm";
import { ForgotPasswordFormData } from "@/domain/schemas/passwordRecoverySchema";
import { api } from "@/infra/services/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email: data.email });

      toast.success("Uma nova senha foi enviada para o seu e-mail");
      router.push("/login");
    } catch (error: any) {
      console.error("Falha ao solicitar recuperação de senha:", error);

      if (error.response?.status === 404) {
        toast.error("O e-mail informado não existe para nenhum usuário cadastrado");
      } else {
        toast.error("Ocorreu um erro ao tentar enviar a nova senha para o seu e-mail");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full min-h-screen bg-gray-50 max-sm:px-4">
      <div className="flex justify-center items-center cursor-pointer" onClick={() => router.push("/login")}>
        <img
          src="/logo-horizontal.png"
          alt="Logo da Universidade Federal do Ceará"
          className="w-[300px]"
        />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-paragraph">Recuperar Senha</h1>
          <p className="text-sm text-paragraph">
            Você receberá uma nova senha de acesso caso o e-mail exista no sistema.
          </p>
        </div>

        <ForgotPasswordForm
          isSubmitting={isLoading}
          onSubmit={handleForgotPassword}
        />

        <Link href="/login" className="text-sm text-center text-primary hover:underline">
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
}
