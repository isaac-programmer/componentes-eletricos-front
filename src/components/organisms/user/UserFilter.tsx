"use client";

import { useGetGroups } from "@/useCases/group/useGetGroups";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Filter } from "lucide-react";
import { Fragment } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { mask } from "remask";
import { handlePhoneChange } from "@/utils/maskPhoneNumber";

type FilterFormInputs = {
  name: boolean;
  nameValue: string;
  username: boolean;
  usernameValue: string;
  group: boolean;
  groupId: string;
  phone: boolean;
  phoneValue: string;
  email: boolean;
  emailValue: string;
};

interface UserFiltersProps {
  onApplyFilters: (filters: Partial<FilterFormInputs>) => void;
}

export function UserFilter({ onApplyFilters }: UserFiltersProps) {
  const { control, register, handleSubmit, watch, reset } = useForm<FilterFormInputs>({
    defaultValues: {
      name: false,
      nameValue: "",
      username: false,
      usernameValue: "",
      group: false,
      groupId: "",
      phone: false,
      phoneValue: "",
      email: false,
      emailValue: "",
    }
  });

  const watchedFields = watch();

  const { data: groups, isLoading: isLoadingGroups } = useGetGroups();

  const onSubmit: SubmitHandler<FilterFormInputs> = (data) => {
    onApplyFilters(data);
  };

  const handleClearFilters = () => {
    reset();
    onApplyFilters({});
  };

  return (
    <Popover className="relative">
      <PopoverButton className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-primary border border-primary rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none">
        <Filter className="h-4 w-4" />
        <span>Filtro</span>
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute right-0 z-10 mt-2 w-screen max-w-xs transform px-4 sm:px-0">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <form onSubmit={handleSubmit(onSubmit)} className="relative bg-white p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="name"
                    {...register("name")}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="name" className="text-sm">Nome</label>
                </div>
                {watchedFields.name && (
                  <input
                    type="text"
                    placeholder="Informe o nome"
                    {...register("nameValue")}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                  />
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="username"
                    {...register("username")}
                    className="h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  <label htmlFor="username" className="text-sm">Usuário</label>
                </div>
                {watchedFields.username && (
                  <input
                    type="text"
                    placeholder="Informe o usuário"
                    {...register("usernameValue")}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                  />
                )}

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="group" {...register("group")} className="h-4 w-4 rounded accent-primary cursor-pointer" />
                  <label htmlFor="group" className="text-sm">Grupo</label>
                </div>
                {watchedFields.group && (
                  <select
                    id="groupId"
                    {...register("groupId")}
                    disabled={isLoadingGroups}
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 cursor-pointer"
                  >
                    <option value="">{isLoadingGroups ? "Carregando..." : "Selecione um grupo"}</option>
                    {groups?.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="phone"
                  {...register("phone")}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <label htmlFor="phone" className="text-sm">Telefone</label>
              </div>
              {watchedFields.phone && (
                <Controller
                  control={control}
                  name="phoneValue"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Informe o telefone"
                      value={field.value || ""}
                      onChange={(e) => {
                        const masked = handlePhoneChange(e.target.value, field.value || "");
                        field.onChange(masked);
                      }}
                      className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                    />
                  )}
                />
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="email"
                  {...register("email")}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <label htmlFor="email" className="text-sm">E-mail</label>
              </div>
              {watchedFields.email && (
                <input
                  type="email"
                  placeholder="Informe o e-mail"
                  {...register("emailValue")}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                />
              )}

              <div className="flex justify-center gap-2 pt-4">
                <button type="button" onClick={handleClearFilters} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Limpar
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                  Aplicar Filtros
                </button>
              </div>
            </form>
          </div>
        </PopoverPanel>
      </Transition >
    </Popover >
  );
}