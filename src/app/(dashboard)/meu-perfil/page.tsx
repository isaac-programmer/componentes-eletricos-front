"use client";

import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { UpdateMyProfileForm } from "@/components/organisms/user/UpdateMyProfileForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { UpdateMyProfileFormData } from "@/domain/schemas/userSchema";
import { useChangeMyPassword } from "@/useCases/profile/useChangeMyPassword";
import { useGetMyProfile } from "@/useCases/profile/useGetMyProfile";
import { useUpdateMyProfile } from "@/useCases/profile/useUpdateMyProfile";
import { User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { setBreadcrumbs } = useBreadcrumbs();

  const { data: profileData, isLoading, isError } = useGetMyProfile();

  const { mutateAsync: updateMyProfile, isPending: isUpdatingProfile } = useUpdateMyProfile();
  const { mutateAsync: changeMyPassword, isPending: isChangingPassword } = useChangeMyPassword();

  const isSubmitting = useMemo(() => (isUpdatingProfile || isChangingPassword), [isUpdatingProfile, isChangingPassword]);

  const [imageRemoved, setImageRemoved] = useState(false);

  const handleUpdateMyProfile = async (
    data: UpdateMyProfileFormData,
    dirtyFields: FieldNamesMarkedBoolean<UpdateMyProfileFormData>
  ) => {
    if (Object.keys(dirtyFields).length === 0 && !imageRemoved) {
      toast.error("Nenhuma alteração foi realizada");
      return;
    }

    const payload: Partial<UpdateMyProfileFormData> = {};

    for (const key in dirtyFields) {
      if (key in data) {
        const fieldKey = key as keyof UpdateMyProfileFormData;
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

    if (!profileData) return;

    try {
      await updateMyProfile({ data: payload });

      let passwordChanged = false;

      if (data.newPassword && data.confirmPassword) {
        if (data.newPassword.length < 8) {
          toast.error("A nova senha deve ter no mínimo 8 caracteres");
          return;
        }

        if (data.confirmPassword.length < 8) {
          toast.error("A confirmação da senha deve ter no mínimo 8 caracteres");
          return;
        }

        if (data.newPassword !== data.confirmPassword) {
          toast.error("As senhas não coincidem");
          return;
        }

        try {
          await changeMyPassword({
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          });
          
          passwordChanged = true;
        } catch (error) {
          console.error("Erro ao alterar senha:", error);
          return;
        }
      }

      if (passwordChanged && (payload.email || (payload.email === undefined && profileData.emails && profileData.emails.length > 0))) {
        toast.success("Perfil atualizado com sucesso! Nova senha enviada para o seu e-mail.");
      } else {
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o seu perfil:", error);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: User,
      items: [
        { href: "/meu-perfil", label: "Meu Perfil" },
      ]
    });
  }, [setBreadcrumbs]);


  if (isLoading) {
    return <LoadingSpinner text="Carregando os dados do seu perfil..." />;
  }

  if (isError || !profileData) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Os dados do seu perfil não foram encontrados
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-paragraph">
          Editar Meu Perfil
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6 my-0 mx-auto md:w-[40vw]">
        <UpdateMyProfileForm
          onSubmit={handleUpdateMyProfile}
          isSubmitting={isSubmitting}
          profileData={profileData}
          onRemoveImage={() => setImageRemoved(true)}
        />
      </div>
    </div>
  );
}