'use client';

import Link from "next/link";
import { ConfirmationContent } from "@/components/molecules/ConfirmationContent";
import { Modal } from "@/components/molecules/Modal";
import { Pagination } from "@/components/molecules/Pagination";
import { ComponentFilter } from "@/components/organisms/component/ComponentFilter";
import { ComponentsTable } from "@/components/organisms/component/ComponentsTable";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { ComponentFilters } from "@/domain/repositories/ComponentRepository";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteComponent } from "@/useCases/component/useDeleteComponent";
import { useGetComponents } from "@/useCases/component/useGetComponents";
import { Cpu, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";

type FilterFormInputs = {
  name: boolean;
  nameValue: string;
  reference: boolean;
  referenceValue: string;
  origin: boolean;
  originValue: string;
  category: boolean;
  categoryId: string;
  laboratory: boolean;
  laboratoryId: string;
};

export default function Componentes() {
  const router = useRouter();
  const { user } = useAuthentication();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<ComponentFilters>({ page: 1, limit: 10 });
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null);

  const { setBreadcrumbs } = useBreadcrumbs();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filtersToFetch: ComponentFilters = useMemo(() => ({
    ...appliedFilters,
    search: debouncedSearchTerm,
  }), [debouncedSearchTerm, appliedFilters]);

  const { data: listComponents, isLoading, isError } = useGetComponents(filtersToFetch);

  const { mutate: deleteComponente, isPending: isDeleting } = useDeleteComponent();

  const handleEdit = (id: string) => {
    router.push(`/componentes/${id}/editar`);
  };

  const handleView = (id: string) => {
    router.push(`/componentes/${id}/visualizar`);
  };

  const handleApplyFilters = (formFilters: Partial<FilterFormInputs>)=> {
    const newFilters: ComponentFilters = {
      page: 1,
      limit: 10,
    };

    if (formFilters.name && formFilters.nameValue) {
      newFilters.name = formFilters.nameValue;
    }

    if (formFilters.reference && formFilters.referenceValue) {
      newFilters.reference = formFilters.referenceValue;
    }

    if (formFilters.origin && formFilters.originValue) {
      newFilters.origin = formFilters.originValue;
    }

    if (formFilters.category && formFilters.categoryId) {
      newFilters.categoryId = formFilters.categoryId;
    }

    if (formFilters.laboratory && formFilters.laboratoryId) {
      newFilters.laboratoryId = formFilters.laboratoryId;
    }

    setAppliedFilters(newFilters);
  };

  const handleOpenDeleteModal = (id: string) => {
    setComponentToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setComponentToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (componentToDelete) {
      deleteComponente(componentToDelete, {
        onSuccess: () => {
          handleCloseDeleteModal();
        }
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setAppliedFilters(prevFilters => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: Cpu,
      items: [
        { href: "/componentes", label: "Componentes" },
      ]
    });
  }, [setBreadcrumbs]);

  if (isError) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Ocorreu um erro ao buscar os componentes
      </p>
    );
  }

  const components = useMemo(() => listComponents?.data || [], [listComponents]);
  const meta = useMemo(() => listComponents?.meta, [listComponents]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-4">
        <h2 className="text-2xl text-paragraph md:text-lg">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-primary rounded-md text-sm focus:outline-none placeholder:text-primary"
            />
          </div>

          <ComponentFilter onApplyFilters={handleApplyFilters} />

          {user?.group?.isAdmin && (
            <Link
              href="/componentes/novo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              <span>Adicionar</span>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-0 md:p-6 space-y-6">
        <ComponentsTable
          data={components}
          isLoading={isLoading}
          onDelete={handleOpenDeleteModal}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>

      {meta && (
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Deletar Componente"
      >
        <ConfirmationContent
          isLoading={isDeleting}
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          text="Você deseja realmente deletar este componente?"
        />
      </Modal>
    </div>
  );
}
