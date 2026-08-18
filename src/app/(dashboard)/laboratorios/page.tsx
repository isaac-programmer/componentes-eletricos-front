'use client';

import { ConfirmationContent } from "@/components/molecules/ConfirmationContent";
import { Modal } from "@/components/molecules/Modal";
import { Pagination } from "@/components/molecules/Pagination";
import { LaboratoriesTable } from "@/components/organisms/laboratory/LaboratoriesTable";
import { LaboratoryFormModal } from "@/components/organisms/laboratory/LaboratoryFormModal";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { LaboratoryFilters } from "@/domain/repositories/LaboratoryRepository";
import { Laboratory } from "@/domain/entities/laboratory";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetLaboratories } from "@/useCases/laboratory/useGetLaboratories";
import { useDeleteLaboratory } from "@/useCases/laboratory/useDeleteLaboratory";
import { Airplay, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";

export default function Laboratorios() {
  const router = useRouter();
  const { user } = useAuthentication();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<LaboratoryFilters>({ page: 1, limit: 10 } as any);
  const [laboratoryToDelete, setLaboratoryToDelete] = useState<string | null>(null);
  const [laboratoryToEdit, setLaboratoryToEdit] = useState<Laboratory | null>(null);

  const { setBreadcrumbs } = useBreadcrumbs();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filtersToFetch: LaboratoryFilters = useMemo(() => ({
    ...appliedFilters,
    name: debouncedSearchTerm,
  }), [debouncedSearchTerm, appliedFilters]);

  const { data: listLaboratories, isLoading, isError } = useGetLaboratories(filtersToFetch);
  const laboratories = useMemo(() => listLaboratories?.data || [], [listLaboratories]);
  const meta = useMemo(() => listLaboratories?.meta, [listLaboratories]);

  const { mutate: deleteLaboratory, isPending: isDeleting } = useDeleteLaboratory();

  const handleOpenFormModal = (laboratory?: Laboratory) => {
    setLaboratoryToEdit(laboratory || null);
    setFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setLaboratoryToEdit(null);
    setFormModalOpen(false);
  };

  const handleEdit = (id: string) => {
    const laboratory = laboratories.find(lab => lab.id === id);
    if (laboratory) {
      handleOpenFormModal(laboratory);
    }
  };

  const handleView = (id: string) => {
    router.push(`/laboratorios/${id}/visualizar`);
  };

  const handleOpenDeleteModal = (id: string) => {
    setLaboratoryToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setLaboratoryToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (laboratoryToDelete) {
      deleteLaboratory(laboratoryToDelete, {
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
    } as any));
  };

  useEffect(() => {
    setBreadcrumbs({
      icon: Airplay,
      items: [
        { href: "/laboratorios", label: "Laboratórios" },
      ]
    });
  }, [setBreadcrumbs]);

  if (isError) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Ocorreu um erro ao buscar os laboratórios
      </p>
    );
  }

  return (
    <div className="flex flex-col max-lg:items-center gap-6">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-4">
        <h1 className="text-2xl font-semibold text-paragraph lg:text-lg">
          Laboratórios disponíveis
        </h1>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-4">
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

          {user?.group?.isAdmin && (
            <button
              onClick={() => handleOpenFormModal()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              <span>Adicionar</span>
            </button>
          )}
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow-sm border border-border p-0 lg:p-6 max-lg:max-w-[85vw] max-lg:overflow-x-auto">
        <LaboratoriesTable
          data={laboratories}
          isLoading={isLoading}
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
        title="Deletar Laboratório"
      >
        <ConfirmationContent
          isLoading={isDeleting}
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          text="Você deseja realmente deletar este laboratório?"
        />
      </Modal>

      <LaboratoryFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        laboratory={laboratoryToEdit}
      />
    </div>
  );
}
