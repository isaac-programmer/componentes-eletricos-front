"use client";

import { Componente } from "@/domain/entities/componente";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

const columns: ColumnDef<Componente>[] = [
  { accessorKey: "nome", header: "Nome" },
  { accessorKey: "referencia", header: "Referência" },
  { accessorKey: "categoria", header: "Categoria" },
  { accessorKey: "origem", header: "Origem" },
  {
    id: "acoes",
    header: "Ações",
    cell: () => (
      <button className="text-gray-500 hover:text-primary"><MoreHorizontal /></button>
    )
  },
];

interface ComponentesTableProps {
  data: Componente[];
  isLoading: boolean;
}

export function ComponentesTable({ data, isLoading }: ComponentesTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Carregando componentes...</p>;
  if (data.length === 0) return <p>Nenhum componente encontrado.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b text-gray-500 font-medium">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="py-3 px-4">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-3 px-4 text-gray-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}