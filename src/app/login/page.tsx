import { LoginForm } from "@/components/organisms/LoginForm";

export default function LoginPage() {
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
        <LoginForm />
      </div>
    </div>
  );
}