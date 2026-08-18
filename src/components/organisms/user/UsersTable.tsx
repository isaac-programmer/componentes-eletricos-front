"use client";

import { User } from "@/domain/entities/user";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { ActionsMenu } from "../../molecules/ActionsMenu";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import clsx from "clsx";
import { useMemo } from "react";
import { formatPhoneNumber } from "@/utils/maskPhoneNumber";

interface UsersTableProps {
  data: User[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UsersTable({ data, isLoading, onEdit, onDelete }: UsersTableProps) {
  const { user } = useAuthentication();

  const isAdmin = useMemo(() => user?.group?.isAdmin ?? false, [user]);

  const columns: ColumnDef<User>[] = [
    {
      accessorFn: (row) => `${row.name} ${row.surname}`,
      header: "Nome",
      id: "fullName",
    },
    { accessorKey: "username", header: "Usuário" },
    { accessorKey: "group.name", header: "Grupo" },
    {
      accessorFn: (row) => row.phones?.[0] ?? "",
      header: "Telefone",
      id: "telefone",
      cell: (info) => {
        const phoneNumber = info.getValue() as string;
        return formatPhoneNumber(phoneNumber);
      },
    },
    {
      accessorFn: (row) => row.emails?.[0] ?? "",
      header: "E-mail",
      id: "email",
      cell: (info) => {
        const email = info.getValue() as string;
        return email || "-";
      },
    },
  ];

  if (isAdmin) {
    columns.push({
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        const componentId = row.original.id;
        return (
          <ActionsMenu
            onDelete={() => onDelete(componentId)}
            onEdit={() => onEdit(componentId)}
          />
        )
      }
    })
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoadingSpinner text="Buscando os usuários..." />;
  if (data.length === 0) {
    return <p className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhum usuário encontrado</p>;
  }

  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-border text-paragraph font-semibold">
        {table.getHeaderGroups().map(headerGroup => (
          <tr
            key={headerGroup.id}
          >
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="py-3 px-4 text-paragraph whitespace-nowrap"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className={clsx(
              "hover:bg-gray-50",
              isAdmin && "cursor-pointer"
            )}
            onClick={isAdmin ? (e) => {
              e.stopPropagation();
              onEdit(row.original.id);
            } : undefined}
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="py-3 px-4 text-paragraph whitespace-nowrap"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}