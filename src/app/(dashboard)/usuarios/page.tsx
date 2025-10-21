"use client";

import Link from "next/link";
import { ConfirmationContent } from "@/components/molecules/ConfirmationContent";
import { Modal } from "@/components/molecules/Modal";
import { Pagination } from "@/components/molecules/Pagination";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { UserFilters } from "@/domain/repositories/UserRepository";
import { useDebounce } from "@/hooks/useDebounce";
import { Plus, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useDeleteUser } from "@/useCases/user/useDeleteUser";
import { useGetUsers } from "@/useCases/user/useGetUsers";
import { UsersTable } from "@/components/organisms/user/UsersTable";
import { UserFilter } from "@/components/organisms/user/UserFilter";

type FilterFormInputs = {
  name: boolean;
  nameValue: string;
  group: boolean;
  groupId: string;
  phone: boolean;
  phoneValue: string;
};

export default function Usuarios() {
  const router = useRouter();
  const { user } = useAuthentication();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<UserFilters>({ page: 1, limit: 10 });
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const { setBreadcrumbs } = useBreadcrumbs();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filtersToFetch: UserFilters = useMemo(() => ({
    ...appliedFilters,
    search: debouncedSearchTerm,
  }), [debouncedSearchTerm, appliedFilters]);

  const { data: listUsers, isLoading, isError } = useGetUsers(filtersToFetch);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleEdit = (id: string) => {
    router.push(`/usuarios/${id}/editar`);
  };

  const handleApplyFilters = (formFilters: Partial<FilterFormInputs>) => {
    const newFilters: UserFilters = {
      page: 1,
      limit: 10,
    };

    if (formFilters.name && formFilters.nameValue) {
      newFilters.name = formFilters.nameValue;
    }

    if (formFilters.group && formFilters.groupId) {
      newFilters.groupId = formFilters.groupId;
    }

    if (formFilters.phone && formFilters.phoneValue) {
      newFilters.phone = formFilters.phoneValue.replace(/\D/g, '');
    }

    setAppliedFilters(newFilters);
  };

  const handleOpenDeleteModal = (id: string) => {
    setUserToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete, {
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
      icon: Users,
      items: [
        { href: "/usuarios", label: "Usuários" },
      ]
    });
  }, [setBreadcrumbs]);

  if (isError) {
    return (
      <p
        className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 bg-white text-center"
      >
        Ocorreu um erro ao buscar os usuários
      </p>
    );
  }

  const users = useMemo(() => listUsers?.data || [], [listUsers]);
  const meta = useMemo(() => listUsers?.meta, [listUsers]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-4">
        <h2 className="text-2xl text-paragraph md:text-lg">
          Usuários cadastrados
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

          <UserFilter onApplyFilters={handleApplyFilters} />

          {user?.group?.isAdmin && (
            <Link
              href="/usuarios/novo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              <span>Adicionar</span>
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-0 md:p-6 space-y-6">
        <UsersTable
          data={users}
          isLoading={isLoading}
          onDelete={handleOpenDeleteModal}
          onEdit={handleEdit}
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
        title="Deletar Usuário"
      >
        <ConfirmationContent
          isLoading={isDeleting}
          onCancel={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          text="Você deseja realmente deletar este usuário?"
        />
      </Modal>
    </div>
  );
}
