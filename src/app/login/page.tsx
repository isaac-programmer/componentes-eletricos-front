"use client";

import { LoginForm } from "@/components/organisms/LoginForm";
import { LoginFormData, LoginRequest } from "@/domain/schemas/authenticationSchema";
import { useAuthenticateSignIn } from "@/useCases/useAuthentication";
import { useRouter } from "next/navigation";
import { setCookie } from "@/infra/utils/cookies";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useAuthenticateSignIn();

  const handleLogin = async (data: LoginFormData) => {
    const isEmail = data.login.includes("@");

    const updatedData: LoginRequest = {
      ...(isEmail ? { email: data.login } : { username: data.login }),
      password: data.password,
    };

    try {
      const tokens = await login(updatedData);

      setCookie({ key: process.env.NEXT_PUBLIC_TOKEN_KEY as string, value: tokens.accessToken, expires: 1/60 });
      setCookie({ key: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string, value: tokens.refreshToken, expires: 3/60 });

      toast.success("Login realizado com sucesso!");
      router.push("/componentes");
    } catch (error) {
      console.error(error);
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
          isSubmitting={isPending}
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
}