"use client";

import { ComponentOrigin } from "@/domain/enums/ComponentOrigin";
import { useGetCategories } from "@/useCases/category/useGetCategories";
import { useGetLaboratories } from "@/useCases/laboratory/useGetLaboratories";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Filter, X } from "lucide-react";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FilterFormInputs = {
  name: boolean;
  nameValue: string;
  reference: boolean;
  referenceValue: string;
  origin: boolean;
  originValue: string;
  category: boolean;
  categoryId: string;
  laboratory: boolean;
  laboratoryId: string;
};

interface ComponentFiltersProps {
  onApplyFilters: (filters: Partial<FilterFormInputs>) => void;
}

export function ComponentFilter({ onApplyFilters }: ComponentFiltersProps) {
  const { register, handleSubmit, watch, reset } = useForm<FilterFormInputs>({
    defaultValues: {
      name: false,
      nameValue: "",
      reference: false,
      referenceValue: "",
      origin: false,
      originValue: "",
      category: false,
      categoryId: "",
      laboratory: false,
      laboratoryId: "",
    }
  });

  const watchedFields = watch();

  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();
  const { data: laboratories, isLoading: isLoadingLaboratories } = useGetLaboratories();

  const onSubmit: SubmitHandler<FilterFormInputs> = (data) => {
    onApplyFilters(data);
  };

  const handleClearFilters = () => {
    reset();
    onApplyFilters({});
  };

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
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
            <PopoverPanel className="max-lg:fixed max-lg:inset-0 max-lg:z-50 max-lg:w-full max-lg:h-dvh max-lg:bg-white max-lg:overflow-y-auto lg:absolute lg:right-0 lg:z-10 lg:mt-2 lg:w-screen lg:max-w-xs lg:transform lg:px-0">
              <div className="lg:overflow-hidden lg:rounded-lg lg:shadow-lg lg:ring-1 lg:ring-black/5 max-lg:min-h-full max-lg:p-4">
                <div className="lg:hidden flex justify-between items-center pb-4 mb-4">
                  <h3 className="text-lg font-medium text-primary">Filtro</h3>
                  <button type="button" onClick={() => close()} className="p-1 rounded-full hover:bg-gray-100">
                    <X className="h-4 w-4 text-primary" />
                  </button>
                </div>
                <form
                  onSubmit={handleSubmit((data) => {
                    onSubmit(data);
                    close();
                  })}
                  className="relative bg-white lg:p-6 space-y-4"
                >
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
                        id="reference"
                        {...register("reference")}
                        className="h-4 w-4 rounded accent-primary cursor-pointer"
                      />
                      <label htmlFor="reference" className="text-sm">Referência</label>
                    </div>
                    {watchedFields.reference && (
                      <input
                        type="text"
                        placeholder="Informe a referência"
                        {...register("referenceValue")}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
                      />
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="origin"
                        {...register("origin")}
                        className="h-4 w-4 rounded accent-primary cursor-pointer"
                      />
                      <label htmlFor="origin" className="text-sm">Origem</label>
                    </div>
                    {watchedFields.origin && (
                      <select
                        id="originValue"
                        {...register("originValue")}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 cursor-pointer"
                      >
                        <option value="">Selecione a origem</option>
                        {Object.values(ComponentOrigin).map((origin) => (
                          <option key={origin} value={origin}>
                            {origin}
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="category" {...register("category")} className="h-4 w-4 rounded accent-primary cursor-pointer" />
                      <label htmlFor="category" className="text-sm">Categoria</label>
                    </div>
                    {watchedFields.category && (
                      <select
                        id="categoryId"
                        {...register("categoryId")}
                        disabled={isLoadingCategories}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 cursor-pointer"
                      >
                        <option value="">{isLoadingCategories ? "Carregando..." : "Selecione uma categoria"}</option>
                        {categories?.data?.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="laboratory" {...register("laboratory")} className="h-4 w-4 rounded accent-primary cursor-pointer" />
                      <label htmlFor="laboratory" className="text-sm">Local</label>
                    </div>
                    {watchedFields.laboratory && (
                      <select
                        id="laboratoryId"
                        {...register("laboratoryId")}
                        disabled={isLoadingLaboratories}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 cursor-pointer"
                      >
                        <option value="">{isLoadingLaboratories ? "Carregando..." : "Selecione um laboratório"}</option>
                        {laboratories?.data?.map(laboratory => (
                          <option key={laboratory.id} value={laboratory.id}>
                            {laboratory.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="flex justify-center gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        handleClearFilters();
                        close();
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Limpar
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                      Aplicar Filtros
                    </button>
                  </div>
                </form>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}