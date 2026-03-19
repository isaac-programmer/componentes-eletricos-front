"use client";

import { ComponentForm } from "@/components/organisms/component/ComponentForm";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { useCreateComponent } from "@/useCases/component/useCreateComponent";
import { Cpu } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function NewComponentPage() {
  const router = useRouter();
  const { setBreadcrumbs } = useBreadcrumbs();

  const { mutateAsync: createComponente, isPending } = useCreateComponent();

  const handleCreateComponent = async (data: ComponentFormData) => {
    try {
      const createdComponent = await createComponente(data);
      toast.success("Componente cadastrado com sucesso!");
      router.push(`/componentes/${createdComponent.id}/editar#estoque`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: Cpu,
      items: [
        { href: "/componentes", label: "Componentes" },
        { href: "/componentes/novo", label: "Novo componente" },
      ]
    });
  }, [setBreadcrumbs]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-regular text-paragraph">
          Informações do componente
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <ComponentForm
          isSubmitting={isPending}
          onSubmit={handleCreateComponent}
        />
      </div>
    </div>
  );
}