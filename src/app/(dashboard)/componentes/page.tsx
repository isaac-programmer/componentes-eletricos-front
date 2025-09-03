'use client';

import { ComponentesTable } from "@/components/organisms/ComponentesTable";
import { useGetComponentes } from "@/useCases/useGetComponentes";
import { Plus } from "lucide-react";

export default function Componentes() {
  const { data: response, isLoading, isError } = useGetComponentes();

  if (isError) {
    return <div className="text-red-500">Ocorreu um erro ao buscar os componentes.</div>
  }

  const componentes = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg  text-paragraph">
          Componentes cadastrados
        </h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-border p-6 space-y-6">
        <ComponentesTable data={componentes} isLoading={isLoading} />
      </div>
    </div>
  );
}
