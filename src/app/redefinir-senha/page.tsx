"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm";
import { ResetPasswordFormData } from "@/domain/schemas/passwordRecoverySchema";
import { api } from "@/infra/services/api";
import toast from "react-hot-toast";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Token de recuperação não encontrado");
      router.push("/login");
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [token, router]);

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (!token) return;
    
    setIsLoading(true);

    try {
      await api.post("/auth/reset-password", { 
        token, 
        newPassword: data.password 
      });
      
      toast.success("Senha alterada com sucesso! Faça seu login");
      router.push("/login");
    } catch (error) {
      console.error("Falha ao redefinir a senha:", error);
      toast.error("Ocorreu um erro ao tentar redefinir a senha. O token pode estar expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mb-12 cursor-pointer" onClick={() => router.push("/login")}>
        <img
          src="/logo-horizontal.png"
          alt="Logo da Universidade Federal do Ceará"
          className="w-[300px]"
        />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-paragraph">Redefinir Senha</h1>
          <p className="text-sm text-placeholder">
            Crie uma nova senha para a sua conta.
          </p>
        </div>
        
        <ResetPasswordForm
          isSubmitting={isLoading}
          onSubmit={handleResetPassword}
        />
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
