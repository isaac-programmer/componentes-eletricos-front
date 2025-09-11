"use client";

import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories } from "@/useCases/useGetCategories";
import { ComponentFormData, componentSchema } from "@/domain/schemas/componentSchema";

interface ComponentFormProps {
  onSubmit: (data: ComponentFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ComponentForm({ onSubmit, isSubmitting }: ComponentFormProps) {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ComponentFormData>({
    resolver: zodResolver(componentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
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
          <label htmlFor="reference">Referência*</label>
          <input
            type="text"
            {...register("reference")}
            placeholder="Informe a referência do componente"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.reference && <p className="text-xs text-red-600 mt-1">{errors.reference.message}</p>}
        </div>
        <div>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Informe uma descrição do componente"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
        </div>
        <div>
          <label htmlFor="origin">Origem*</label>
          <input
            type="text"
            id="origin"
            {...register("origin")}
            placeholder="Informe a origem do componente"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
          {errors.origin && <p className="text-xs text-red-600 mt-1">{errors.origin.message}</p>}
        </div>
        <div>
          <label htmlFor="categoryId">Categoria*</label>
          <select
            id="categoryId"
            {...register("categoryId")}
            disabled={isLoadingCategories}
            className="w-full px-3 py-2 cursor-pointer border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          >
            <option value="">{isLoadingCategories ? "Carregando..." : "Selecione uma categoria"}</option>
            {categories?.data?.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-red-600 mt-1">{errors.categoryId.message}</p>}
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="w-full h-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-paragraph">
          <span>Clique para selecionar uma imagem</span>
        </div>
      </div>

      <div className="md:col-span-3 flex justify-start gap-3 mt-4">
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