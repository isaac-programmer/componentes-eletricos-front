"use client";

import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { UpdateUserForm } from "@/components/organisms/user/UpdateUserForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { UpdateUserFormData, UserFormData } from "@/domain/schemas/userSchema";
import { useGetUserById } from "@/useCases/user/useGetUserById";
import { useUpdateUser } from "@/useCases/user/useUpdateUser";
import { Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  const { setBreadcrumbs } = useBreadcrumbs();

  const id = params.id as string;

  const { data: user, isLoading, isError } = useGetUserById(id);

  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const [imageRemoved, setImageRemoved] = useState(false);

  const buildPayload = (
    data: UserFormData,
    dirtyFields: FieldNamesMarkedBoolean<UserFormData>
  ): Partial<UserFormData> => {
    return Object.keys(dirtyFields).reduce<Partial<UserFormData>>(
      (acc, key) => {
        if (key in data) {
          acc[key as keyof UserFormData] = data[key as keyof UserFormData];
        }
        return acc;
      },
      {}
    );
  };

  const handleUpdateUser = async (
    data: UpdateUserFormData,
    dirtyFields: FieldNamesMarkedBoolean<UpdateUserFormData>
  ) => {
    if (Object.keys(dirtyFields).length === 0 && !imageRemoved) {
      toast.error("Nenhuma alteração foi realizada");
      return;
    }

    const payload: Partial<UpdateUserFormData> = {};

    for (const key in dirtyFields) {
      if (key in data) {
        const fieldKey = key as keyof UpdateUserFormData;
        let value = data[fieldKey];

        if (fieldKey === 'cpf' && typeof value === 'string') {
          value = value.replace(/\D/g, '');
        }
        if (fieldKey === 'phone' && typeof value === 'string') {
          value = value.replace(/\D/g, '');
        }

        payload[fieldKey] = value;
      }
    }

    if (imageRemoved && !payload.avatar) {
      payload.imageUrl = null;
    }

    // if (payload.confirmPassword) {
    //   delete payload.confirmPassword;
    // }

    try {
      await updateUser({ id, data: payload });
      toast.success("Usuário atualizado com sucesso!");
      router.push("/usuarios");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: Users,
      items: [
        { href: "/usuarios", label: "Usuários" },
        { href: `/usuarios/${id}/editar`, label: `${user?.name}` },
      ]
    });
  }, [setBreadcrumbs, id, user?.name]);


  if (isLoading) {
    return <LoadingSpinner text="Carregando usuário..." />;
  }

  if (isError || !user) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Usuário não encontrado
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-paragraph max-lg:text-center lg:text-lg">
        Editar Usuário
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6 w-full lg:w-[40vw] mx-auto">
        <UpdateUserForm
          initialData={user}
          onSubmit={handleUpdateUser}
          isSubmitting={isPending}
          onRemoveImage={() => setImageRemoved(true)}
        />
      </div>
    </div>
  );
}