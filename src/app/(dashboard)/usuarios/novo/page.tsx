"use client";

import { CreateUserForm } from "@/components/organisms/user/CreateUserForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { UserFormData } from "@/domain/schemas/userSchema";
import { useCreateUser } from "@/useCases/user/useCreateUser";
import { Users } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NewUserPage() {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumbs();

  const { mutateAsync: createUser, isPending } = useCreateUser();

  const handleCreateUser = async (data: UserFormData) => {
    const userPasswordDefault = process.env.NEXT_PUBLIC_USER_PASSWORD_DEFAULT;

    if (!userPasswordDefault) {
      throw new Error("Senha de usuário padrão não configurada");
    }

    try {
      const userCreated = await createUser({ data, password: userPasswordDefault });
      if (data.email) {
        toast.success(`Usuário cadastrado com sucesso! O acesso foi enviado por e-mail para ele.`);
      } else {
        toast.success(`Usuário cadastrado com sucesso! Usuário: ${userCreated.username} e Senha: ${userPasswordDefault}`);
      }
      router.push("/usuarios");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: Users,
      items: [
        { href: "/usuarios", label: "Usuários" },
        { href: "/usuarios/novo", label: "Novo usuário" },
      ]
    });
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-regular text-paragraph">
          Informações do usuário
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6 my-0 mx-auto md:w-[40vw]">
        <CreateUserForm
          isSubmitting={isPending}
          onSubmit={handleCreateUser}
        />
      </div>
    </div>
  );
}