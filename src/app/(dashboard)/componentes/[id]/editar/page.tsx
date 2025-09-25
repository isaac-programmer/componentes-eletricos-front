"use client";

import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { ComponentStockByLaboratoryTable } from "@/components/organisms/ComponentStockByLaboratoryTable";
import { ComponentForm } from "@/components/organisms/ComponentForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { useGetComponentById } from "@/useCases/useGetComponentById";
import { useUpdateComponent } from "@/useCases/useUpdateComponent";
import { useGetComponentStockByLaboratory } from "@/useCases/useGetComponentStockByLaboratory";
import { CircuitBoard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldNamesMarkedBoolean } from "react-hook-form";
import toast from "react-hot-toast";


export default function EditComponentPage() {
  const router = useRouter();
  const params = useParams();
  const { setBreadcrumbs } = useBreadcrumbs();
  const id = params.id as string;

  const { data: component, isLoading, isError } = useGetComponentById(id);
  const { data: componentStockByLaboratory, isLoading: isLoadingComponentStockByLaboratory } = useGetComponentStockByLaboratory(id);
  const { mutateAsync: updateComponent, isPending } = useUpdateComponent();

  const [imageRemoved, setImageRemoved] = useState(false);

  const buildPayload = (
    data: ComponentFormData,
    dirtyFields: FieldNamesMarkedBoolean<ComponentFormData>
  ): Partial<ComponentFormData> => {
    return Object.keys(dirtyFields).reduce<Partial<ComponentFormData>>(
      (acc, key) => {
        if (key in data) {
          acc[key as keyof ComponentFormData] = data[key as keyof ComponentFormData];
        }
        return acc;
      },
      {}
    );
  };

  const handleUpdateComponent = async (
    data: ComponentFormData,
    dirtyFields: FieldNamesMarkedBoolean<ComponentFormData>
  ) => {
    const payload: Partial<ComponentFormData> = buildPayload(data, dirtyFields);

    if (imageRemoved && !payload.image) {
      payload.imageUrl = null;
    }

    if (Object.keys(payload).length === 0) {
      toast.error("Nenhuma alteração foi feita.");
      return;
    }

    try {
      await updateComponent({ id, data: payload });
      toast.success("Componente atualizado com sucesso!");
      router.push("/componentes");
    } catch (error) {
      console.error("Erro ao atualizar componente:", error);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: CircuitBoard,
      items: [
        { href: "/componentes", label: "Componentes" },
        { href: `/componentes/${id}/editar`, label: `${component?.name}` },
      ]
    });
  }, [setBreadcrumbs, id, component?.name]);


  if (isLoading) {
    return <LoadingSpinner text="Carregando componente..." />;
  }

  if (isError || !component) {
    return <p>Componente não encontrado ou erro ao carregar</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-paragraph">
          Editar Componente
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <ComponentForm
          initialData={component}
          onSubmit={handleUpdateComponent}
          isSubmitting={isPending}
          onRemoveImage={() => setImageRemoved(true)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-paragraph mb-4">Quantidade por laboratório</h2>
        <ComponentStockByLaboratoryTable 
          data={componentStockByLaboratory}
          isLoading={isLoadingComponentStockByLaboratory}
        />
      </div>
    </div>
  );
}