"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useGetComponentReport } from "@/useCases/component/useGetComponentReport";
import { FileText, Download, Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { ReportTable } from "@/components/organisms/report/ReportTable";
import { exportToExcel } from "@/utils/exportToExcel";
import { useDebounce } from "@/hooks/useDebounce";
import { Pagination } from "@/components/molecules/Pagination";

import { ComponentFilters } from "@/domain/repositories/ComponentRepository";

export default function RelatoriosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [appliedFilters, setAppliedFilters] = useState<ComponentFilters>(() => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    return {
      page: 1,
      limit: 10,
      startDate: sixMonthsAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    };
  });

  const { setBreadcrumbs } = useBreadcrumbs();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleApplyFilters = (formFilters: Partial<ComponentFilters>) => {
    const newFilters: ComponentFilters = {
      ...appliedFilters,
      ...formFilters,
      page: 1,
    };

    setAppliedFilters(newFilters);
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: FileText,
      items: [
        { href: "/relatorios", label: "Relatórios de Consumo" },
      ]
    });
  }, [setBreadcrumbs]);

  useEffect(() => {
    handleApplyFilters({ search: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  const { data: reportData, isLoading, isError } = useGetComponentReport(appliedFilters);

  const reports = useMemo(() => reportData?.data || [], [reportData]);
  const meta = useMemo(() => reportData?.meta, [reportData]);

  const handleExportExcel = () => {
    if (!reports || reports.length === 0) return;

    const dataToExport = reports.map(item => ({
      "Descrição do Material": `${item.name} (Ref: ${item.reference})`,
      [`Quantidade em: ${getDisplayDate(appliedFilters.startDate)}`]: item.stockAtStart,
      [`Quantidade em: ${getDisplayDate(appliedFilters.endDate)}`]: item.stockAtEnd,
      "Quantidade consumida no período": item.consumedInPeriod
    }));

    exportToExcel(dataToExport, `Relatorio_Componentes_${new Date().toISOString().split('T')[0]}`);
  };

  const handlePageChange = (newPage: number) => {
    setAppliedFilters(prevFilters => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  const getDisplayDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString("pt-BR");
  };

  if (isError) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Ocorreu um erro ao buscar os registros de consumo de componentes
      </p>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl text-paragraph md:text-lg font-regular">
          Relatórios de Consumo
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto bg-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-primary rounded-md text-sm focus:outline-none placeholder:text-primary"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto bg-white border border-primary rounded-md px-4 py-2">
            <label className="text-sm font-medium text-primary whitespace-nowrap">Período:</label>
            <input 
              type="date" 
              value={appliedFilters.startDate || ''}
              onChange={(e) => handleApplyFilters({ startDate: e.target.value })}
              className="w-[105px] text-sm border-none bg-transparent focus:outline-none focus:ring-0 p-0 text-paragraph [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
            <span className="text-sm text-paragraph">até</span>
            <input 
              type="date" 
              value={appliedFilters.endDate || ''}
              onChange={(e) => handleApplyFilters({ endDate: e.target.value })}
              className="w-[105px] text-sm border-none bg-transparent focus:outline-none focus:ring-0 p-0 text-paragraph [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>

          <button
            onClick={handleExportExcel}
            disabled={!reports || reports.length === 0}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-0 md:p-6 space-y-6">
        <ReportTable 
          data={reports} 
          isLoading={isLoading} 
          startDateDisplay={getDisplayDate(appliedFilters.startDate)}
          endDateDisplay={getDisplayDate(appliedFilters.endDate)}
        />
      </div>

      {meta && (
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
