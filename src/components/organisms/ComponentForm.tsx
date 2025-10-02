"use client";

import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { Controller, FieldNamesMarkedBoolean, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories } from "@/useCases/useGetCategories";
import { ComponentFormData, componentSchema } from "@/domain/schemas/componentSchema";
import { ImageUploader } from "../molecules/ImageUploader";
import { useRouter } from "next/navigation";
import { Component } from "@/domain/entities/component";
import { useEffect } from "react";

interface ComponentFormProps {
  onSubmit: (data: ComponentFormData, dirtyFields: FieldNamesMarkedBoolean<ComponentFormData>) => Promise<void>;
  isSubmitting?: boolean;
  initialData?: Component;
  onRemoveImage?: () => void;
}

export function ComponentForm({
  onSubmit,
  isSubmitting,
  initialData,
  onRemoveImage,
}: ComponentFormProps) {
  const router = useRouter();
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<ComponentFormData>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      name: initialData?.name || "",
      reference: initialData?.reference || "",
      description: initialData?.description || "",
      origin: initialData?.origin || "",
      categoryId: initialData?.category?.id || "",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        reference: initialData.reference,
        description: initialData.description || "",
        origin: initialData.origin,
        categoryId: initialData.category.id,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, dirtyFields))} className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <label htmlFor="description">Descrição <span className="text-sm">&#40;opcional&#41;</span></label>
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
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUploader
              onChange={field.onChange}
              value={field.value}
              onRemoveInitial={onRemoveImage}
              initialImageUrl={initialData?.imageUrl}
            />
          )}
        />
        {errors.image && <p className="text-xs text-red-600 mt-1">{errors.image.message as string}</p>}
      </div>

      <div className="md:col-span-3 flex justify-center md:justify-start gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.push("/componentes")}
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
            {initialData ? "Salvar Alterações" : "Cadastrar"}
          </span>
        </button>
      </div>
    </form>
  )
}