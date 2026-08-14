"use client";

import { LoginForm } from "@/components/organisms/LoginForm";
import { LoginFormData, LoginRequest } from "@/domain/schemas/authenticationSchema";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import Link from "next/link";

export default function LoginPage() {
  const { signIn, isLoading, setIsLoading } = useAuthentication();

  const handleLogin = async (data: LoginFormData) => {
    const isEmail = data.login.includes("@");

    const updatedData: LoginRequest = {
      ...(isEmail ? { email: data.login } : { username: data.login }),
      password: data.password,
    };

    try {
      await signIn(updatedData);
    } catch (error) {
      console.error("Falha no login (tratada pelo contexto):", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full min-h-screen bg-gray-50 max-sm:px-4">
      <div className="flex justify-center items-center">
        <img
          src="/logo-horizontal.png"
          alt="Logo da Universidade Federal do Ceará"
          className="w-[300px]"
        />
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-paragraph">Inventário de Componentes Elétricos</h1>

        <LoginForm
          isSubmitting={isLoading}
          onSubmit={handleLogin}
        />

        <Link href="/recuperar-senha" className="text-sm text-center text-primary hover:underline">
          Esqueceu a senha?
        </Link>
      </div>
    </div>
  );
}