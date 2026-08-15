"use client";

import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";
import { ComponentViewForm } from "@/components/organisms/component/ComponentViewForm";
import { ComponentStockByLaboratoryTable } from "@/components/organisms/stock/ComponentStockByLaboratoryTable";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useGetComponentById } from "@/useCases/component/useGetComponentById";
import { useGetComponentStockByLaboratory } from "@/useCases/stock/useGetComponentStockByLaboratory";
import { CircuitBoard } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function ComponentViewPage() {
  const params = useParams();

  const { setBreadcrumbs } = useBreadcrumbs();

  const id = params.id as string;

  const { data: component, isLoading, isError } = useGetComponentById(id);
  const { data: componentStockByLaboratory, isLoading: isLoadingComponentStockByLaboratory } = useGetComponentStockByLaboratory(id);

  useEffect(() => {
    setBreadcrumbs({
      icon: CircuitBoard,
      items: [
        { href: "/componentes", label: "Componentes" },
        { href: `/componentes/${id}/visualizar`, label: `${component?.name}` },
      ]
    });
  }, [setBreadcrumbs, id, component?.name]);


  if (isLoading) {
    return <LoadingSpinner text="Carregando componente..." />;
  }

  if (isError || !component) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Componente não encontrado
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-paragraph max-lg:text-center lg:text-lg">
        Detalhes do Componente
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <ComponentViewForm
          initialData={component}
        />
      </div>

      <div className="w-full bg-white rounded-lg shadow-sm border border-border p-6 max-sm:max-w-[85vw] max-sm:overflow-x-auto">
        <h2 className="text-lg font-semibold text-paragraph mb-4 max-lg:text-center">Quantidade por laboratório</h2>
        <div className="w-full max-sm:max-w-[85vw] max-sm:overflow-x-auto">
          <ComponentStockByLaboratoryTable
            data={componentStockByLaboratory}
            isLoading={isLoadingComponentStockByLaboratory}
            onAddStock={() => { }}
            onConsumeStock={() => { }}
            onTransferStock={() => { }}
          />
        </div>
      </div>
    </div>
  );
}