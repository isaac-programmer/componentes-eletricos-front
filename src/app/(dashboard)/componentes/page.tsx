'use client';

import { ConfirmationContent } from "@/components/molecules/ConfirmationContent";
import { Modal } from "@/components/molecules/Modal";
import { ComponentsTable } from "@/components/organisms/ComponentsTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteComponent } from "@/useCases/useDeleteComponent";
import { useGetComponents } from "@/useCases/useGetComponents";
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function Componentes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: response, isLoading, isError } = useGetComponents(debouncedSearchTerm);

  const { mutate: deleteComponente, isPending: isDeleting } = useDeleteComponent();

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

  if (isError) {
    return <div className="text-red-500 text-center">Ocorreu um erro ao buscar os componentes.</div>
  }

  const componentes = response?.data || [];

  return (
    <div className="space-y-6">
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
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-primary border border-primary rounded-md text-sm font-medium bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filtro
          </button>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90">
            <Plus className="h-4 w-4"
            />
            Adicionar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-0 md:p-6 space-y-6">
        <ComponentsTable
          data={componentes}
          isLoading={isLoading}
          onDelete={handleOpenDeleteModal}
          onEdit={(id) => console.log('Editar ID:', id)}
        />
      </div>

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
