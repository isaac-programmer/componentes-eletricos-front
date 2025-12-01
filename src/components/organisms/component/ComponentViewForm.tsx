"use client";

import { Component } from "@/domain/entities/component";
import { ComponentFormData, componentSchema } from "@/domain/schemas/componentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImageUploader } from "../../molecules/ImageUploader";

interface ComponentViewFormProps {
  initialData?: Component;
  onRemoveImage?: () => void;
}

export function ComponentViewForm({
  initialData,
  onRemoveImage,
}: ComponentViewFormProps) {

  const {
    reset,
    control,
    register,
    formState: { errors }
  } = useForm<ComponentFormData>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      name: initialData?.name || "",
      reference: initialData?.reference || "",
      description: initialData?.description || "Nenhuma descrição fornecida",
      origin: initialData?.origin || "",
      categoryId: initialData?.category?.id || "",
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        reference: initialData.reference,
        description: initialData.description || "Nenhuma descrição fornecida",
        origin: initialData.origin,
        categoryId: initialData.category.id,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={() => { }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            {...register("name")}
            disabled={true}
            placeholder="Informe o nome do componente"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
        </div>
        <div>
          <label htmlFor="reference">Referência</label>
          <input
            type="text"
            {...register("reference")}
            disabled={true}
            placeholder="Informe a referência do componente"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
        </div>
        <div>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            {...register("description")}
            disabled={true}
            rows={3}

            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1 resize-none"
          />
        </div>
        <div>
          <label htmlFor="origin">Origem</label>
          <input
            type="text"
            id="origin"
            {...register("origin")}
            disabled={true}
            placeholder="Informe a origem do componente"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
        </div>
        <div>
          <label htmlFor="categoryName">Categoria</label>
          <input
            type="text"
            id="categoryName"
            disabled={true}
            value={initialData?.category?.name || "Sem categoria"}
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-1"
          />
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
              disabled={true}
            />
          )}
        />
        {errors.image && <p className="text-xs text-red-600 mt-1">{errors.image.message as string}</p>}
      </div>
    </form>
  )
}