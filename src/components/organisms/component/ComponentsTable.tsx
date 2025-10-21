"use client";

import { Component } from "@/domain/entities/component";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { ActionsMenu } from "../../molecules/ActionsMenu";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useMemo } from "react";
import clsx from "clsx";

interface ComponentsTableProps {
  data: Component[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ComponentsTable({ data, isLoading, onEdit, onDelete }: ComponentsTableProps) {
  const { user } = useAuthentication();

  const isAdmin = useMemo(() => user?.group?.isAdmin ?? false, [user]);

  const columns: ColumnDef<Component>[] = [
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "reference", header: "Referência" },
    { accessorKey: "category.name", header: "Categoria" },
    { accessorKey: "origin", header: "Origem" },
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

  if (isLoading) return <LoadingSpinner text="Buscando os componentes..." />;
  if (data.length === 0) {
    return <p className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhum componente encontrado</p>;
  }

  return (
    <table className="w-full min-w-[700px] text-left text-sm">
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