"use client";

import { ImageUploaderRounded } from "@/components/molecules/ImageUploaderRounded";
import { UserProfile } from "@/domain/entities/user";
import { UpdateMyProfileFormData, updateMyProfileSchema } from "@/domain/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, FieldNamesMarkedBoolean, useForm } from "react-hook-form";
import { mask } from "remask";
import { handlePhoneChange } from "@/utils/maskPhoneNumber";

interface UpdateMyProfileFormProps {
  onSubmit: (data: UpdateMyProfileFormData, dirtyFields: FieldNamesMarkedBoolean<UpdateMyProfileFormData>) => Promise<void>;
  isSubmitting?: boolean;
  profileData?: UserProfile;
  onRemoveImage?: () => void;
}

export function UpdateMyProfileForm({
  onSubmit,
  isSubmitting,
  profileData,
  onRemoveImage,
}: UpdateMyProfileFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<UpdateMyProfileFormData>({
    resolver: zodResolver(updateMyProfileSchema),
    defaultValues: {
      name: profileData?.name || "",
      surname: profileData?.surname || "",
      cpf: mask(profileData?.cpf || "", ["999.999.999-99"]),
      phone: mask(profileData?.phones?.[0] || "", ["(99) 9 9999-9999"]),
      email: profileData?.emails?.[0] || "",
    }
  });

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name,
        surname: profileData.surname,
        cpf: mask(profileData.cpf || "", ["999.999.999-99"]),
        phone: mask(profileData.phones?.[0] || "", ["(99) 9 9999-9999"]),
        email: profileData.emails?.[0] || "",
      });
    }
  }, [profileData, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, dirtyFields))}
      className="flex flex-col gap-6"
      autoComplete="off"
    >
      <div>
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <ImageUploaderRounded
              onChange={field.onChange}
              value={field.value}
              onRemoveInitial={onRemoveImage}
              initialImageUrl={profileData?.imageUrl}
            />
          )}
        />
        {errors.avatar && <p className="text-xs text-red-600 mt-1">{errors.avatar.message as string}</p>}
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="name">Nome*</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Informe o nome do componente"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="surname">Sobrenome*</label>
          <input
            type="text"
            {...register("surname")}
            placeholder="Informe o sobrenome do usuário"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.surname && <p className="text-xs text-red-600 mt-1">{errors.surname.message}</p>}
        </div>
        <div>
          <label htmlFor="cpf">CPF*</label>
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Informe o CPF do usuário"
                value={field.value || ""}
                onChange={(e) => {
                  const masked = mask(e.target.value, ["999.999.999-99"]);
                  field.onChange(masked);
                }}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
              />
            )}
          />
          {errors.cpf && <p className="text-xs text-red-600 mt-1">{errors.cpf.message}</p>}
        </div>
        <div>
          <label htmlFor="phone">Telefone <span className="text-sm">&#40;opcional&#41;</span></label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Informe o telefone do usuário"
                value={field.value || ""}
                onChange={(e) => {
                  const masked = handlePhoneChange(e.target.value, field.value || "");
                  field.onChange(masked);
                }}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
              />
            )}
          />
          {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="email">E-mail <span className="text-sm">&#40;opcional&#41;</span></label>
          <input
            type="email"
            {...register("email")}
            autoComplete="off"
            placeholder="Informe o e-mail do usuário"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Nova Senha <span className="text-sm">&#40;opcional&#41;</span></label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("newPassword")}
              autoComplete="new-password"
              placeholder="Informe a sua senha"
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-placeholder" /> : <Eye className="h-5 w-5 text-placeholder" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-600 text-xs mt-1">{errors.newPassword.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Confirmação de Senha <span className="text-sm">&#40;opcional&#41;</span></label>
          <div className="relative">
            <input
              id="password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              autoComplete="new-password"
              placeholder="Informe a confirmação da sua senha"
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5 text-placeholder" /> : <Eye className="h-5 w-5 text-placeholder" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          type="submit"
          className="relative inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}

          <span className={clsx({ "invisible": isSubmitting })}>
            Salvar Alterações
          </span>
        </button>
      </div>
    </form>
  )
}