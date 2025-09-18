"use client";

import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { ComponentForm } from "@/components/organisms/ComponentForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { useGetComponentById } from "@/useCases/useGetComponentById";
import { useUpdateComponent } from "@/useCases/useUpdateComponent";
import { CircuitBoard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function EditarComponentePage() {
  const router = useRouter();
  const params = useParams();
  const { setBreadcrumbs } = useBreadcrumbs();
  const id = params.id as string;

  const { data: component, isLoading, isError } = useGetComponentById(id); 
  const { mutateAsync: updateComponent, isPending } = useUpdateComponent();

  const handleUpdateComponent = async (data: ComponentFormData) => {
    try {
      await updateComponent({ id, data });
      toast.success("Componente atualizado com sucesso!");
      router.push("/componentes");
    } catch (error) {
      console.error(error);
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
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h2 className="text-lg font-semibold text-paragraph mb-4">Quantidade por laboratório</h2>
        <p>Carregando dados de estoque...</p>
      </div>
    </div>
  );
}