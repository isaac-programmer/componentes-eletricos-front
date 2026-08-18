"use client";

import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Laboratory } from "@/domain/entities/laboratory";
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

interface LaboratoriesTableProps {
  data: Laboratory[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export function LaboratoriesTable({ data, isLoading, onEdit, onView }: LaboratoriesTableProps) {
  const { user } = useAuthentication();
  const isAdmin = useMemo(() => user?.group?.isAdmin ?? false, [user]);
  const isMonitor = useMemo(() => user?.group?.name === "Monitor", [user]);

  const columns: ColumnDef<Laboratory>[] = [
    { accessorKey: "name", header: "Nome" },
    { 
      id: "numeroComponentes",
      header: "Número de Componentes",
      cell: ({ row }) => row.original.componentCount || 0,
    },
  ];

  if (isAdmin) {
    columns.push({
      id: "acoes",
      header: "Ações",
      cell: ({ row }) => {
        const laboratoryId = row.original.id;
        return (
          <ActionsMenu
            onEdit={() => onEdit(laboratoryId)}
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
        const laboratoryId = row.original.id;
        return (
          <ActionsMenuViewComponent
            onView={() => onView(laboratoryId)}
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

  if (isLoading) return <LoadingSpinner text="Buscando os laboratórios..." />;
  if (data.length === 0) {
    return <p className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhum laboratório encontrado</p>;
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
