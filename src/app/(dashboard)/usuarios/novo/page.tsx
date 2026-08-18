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
    try {
      const userCreated = await createUser({ data });

      if (data.email) {
        toast.success(`Usuário cadastrado com sucesso! O acesso foi enviado por e-mail para ele.`);
      } else {
        toast.success(`Usuário cadastrado com sucesso! Usuário: ${userCreated.username} (utilize a senha padrão do sistema)`);
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
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-paragraph max-lg:text-center lg:text-lg">
        Informações do usuário
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6 w-full lg:w-[40vw] mx-auto">
        <CreateUserForm
          isSubmitting={isPending}
          onSubmit={handleCreateUser}
        />
      </div>
    </div>
  );
}