"use client";

import { ComponentForm } from "@/components/organisms/ComponentForm";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { useCreateComponent } from "@/useCases/useCreateComponent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NovoComponentePage() {
  const router = useRouter();
  const { mutateAsync: createComponente, isPending } = useCreateComponent();

  const handleCreateComponent = async (data: ComponentFormData) => {
    try {
      await createComponente(data);
      toast.success("Componente cadastrado com sucesso!");
      router.push("/componentes");
    } catch (error) {
      console.error(error);
    }
  };

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