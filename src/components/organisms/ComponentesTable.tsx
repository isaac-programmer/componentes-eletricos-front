"use client";

import { Componente } from "@/domain/entities/componente";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { ActionsMenu } from "../molecules/ActionsMenu";
import { LoadingSpinner } from "../molecules/LoadingSpinner";

interface ComponentesTableProps {
  data: Componente[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ComponentesTable({ data, isLoading, onEdit, onDelete }: ComponentesTableProps) {
  const columns: ColumnDef<Componente>[] = [
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "reference", header: "Referência" },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return value ? value : "-";
      }
    },
    { accessorKey: "origin", header: "Origem" },
    {
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
    },
  ];
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoadingSpinner text="Buscando os componentes..." />;
  if (data.length === 0) return <p>Nenhum componente encontrado</p>;

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
            className="hover:bg-gray-50"
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