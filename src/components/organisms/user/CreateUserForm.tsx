"use client";

import { mask } from "remask";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { Controller, FieldNamesMarkedBoolean, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormData, userSchema } from "@/domain/schemas/userSchema";
import { useRouter } from "next/navigation";
import { useGetGroups } from "@/useCases/group/useGetGroups";
import { ImageUploaderRounded } from "@/components/molecules/ImageUploaderRounded";

interface UserFormProps {
  onSubmit: (data: UserFormData, dirtyFields: FieldNamesMarkedBoolean<UserFormData>) => Promise<void>;
  isSubmitting?: boolean;
  onRemoveImage?: () => void;
}

export function CreateUserForm({
  onSubmit,
  isSubmitting,
  onRemoveImage,
}: UserFormProps) {
  const router = useRouter();
  const { data: groups, isLoading: isLoadingGroups } = useGetGroups();

  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    // reset,
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      surname: "",
      cpf: "",
      phone: "",
      email: "",
      groupId: "",
    }
  });

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
                  const masked = mask(e.target.value, ["(99) 9 9999-9999"]);
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
            autoComplete="email"
            placeholder="Informe o e-mail do usuário"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="groupId">Grupo de Usuário*</label>
          <select
            id="groupId"
            {...register("groupId")}
            disabled={isLoadingGroups}
            className="w-full px-3 py-2 cursor-pointer border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          >
            <option value="">{isLoadingGroups ? "Carregando..." : "Selecione um grupo"}</option>
            {groups?.map((group) => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
          {errors.groupId && <p className="text-xs text-red-600 mt-1">{errors.groupId.message}</p>}
        </div>
        {/* <div className="space-y-1">
          <label htmlFor="password">Senha*</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
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
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Confirmação de Senha*</label>
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
        </div> */}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.push("/usuarios")}
          className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium border border-primary text-primary bg-white rounded-md hover:bg-white"
        >
          Cancelar
        </button>
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
            Cadastrar
          </span>
        </button>
      </div>
    </form>
  )
}