"use client";

import { LoginForm } from "@/components/organisms/LoginForm";
import { LoginFormData, LoginRequest } from "@/domain/schemas/authenticationSchema";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mb-12">
        <img
          src="/logo-horizontal.png"
          alt="Logo da Universidade Federal do Ceará"
          className="w-[300px]"
        />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-paragraph">Login</h1>
        <LoginForm
          isSubmitting={isLoading}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}