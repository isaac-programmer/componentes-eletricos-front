'use client';

import { ComponentesTable } from "@/components/organisms/ComponentesTable";
import { useGetComponentes } from "@/useCases/useGetComponentes";
import { Filter, Plus, Search } from "lucide-react";

export default function Componentes() {
  const { data: response, isLoading, isError } = useGetComponentes();

  if (isError) {
    return <div className="text-red-500">Ocorreu um erro ao buscar os componentes.</div>
  }

  const componentes = response?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-lg text-paragraph">
          Componentes cadastrados
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto bg-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-primary rounded-md text-sm focus:outline-none placeholder:text-primary"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-primary border border-primary rounded-md text-sm font-medium bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filtro
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-border p-0 md:p-6 space-y-6 overflow-x-auto">
        <ComponentesTable data={componentes} isLoading={isLoading} />
      </div>
    </div>
  );
}
