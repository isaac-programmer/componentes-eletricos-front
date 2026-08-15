"use client";

import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Component } from "@/domain/entities/component";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo } from "react";
import { ActionsMenu } from "../../molecules/ActionsMenu";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { ActionsMenuViewComponent } from "@/components/molecules/ActionsMenuViewComponent";

interface ComponentsTableProps {
  data: Component[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ComponentsTable({ data, isLoading, onEdit, onView, onDelete }: ComponentsTableProps) {
  const { user } = useAuthentication();
  const isAdmin = useMemo(() => user?.group?.isAdmin ?? false, [user]);
  const isMonitor = useMemo(() => user?.group?.name === "Monitor", [user]);

  const columns: ColumnDef<Component>[] = [
    { accessorKey: "name", header: "Nome" },
    {
      accessorKey: "reference",
      header: "Referência",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate" title={row.original.reference}>
          {row.original.reference || "-"}
        </div>
      ),
    },
    { accessorKey: "category.name", header: "Categoria" },
    { accessorKey: "totalQuantity", header: "Estoque Total" },
    {
      accessorKey: "laboratory.name",
      header: "Local",
      cell: ({ row }) => row.original.laboratory?.name || "-"
    },
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

  if (isMonitor) {
    columns.push({
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        const componentId = row.original.id;
        return (
          <ActionsMenuViewComponent
            onView={() => onView(componentId)}
          />
        )
      }
    })
  };

  const tableReactTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoadingSpinner text="Buscando os componentes..." />;
  if (data.length === 0) {
    return <p className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhum componente encontrado</p>;
  }

  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-border text-paragraph font-semibold">
        {tableReactTable.getHeaderGroups().map(headerGroup => (
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
        {tableReactTable.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className={clsx(
              "hover:bg-gray-50",
              (isAdmin || isMonitor) && "cursor-pointer"
            )}
            onClick={(isAdmin || isMonitor) ? (e) => {
              e.stopPropagation();
              (isMonitor) ? onView(row.original.id) : onEdit(row.original.id);
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