"use client";

import { ComponentStockByLaboratory } from "@/domain/entities/stock";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { ActionsMenu } from "../molecules/ActionsMenu";
import { LoadingSpinner } from "../molecules/LoadingSpinner";

interface ComponentStockByLaboratoryTableProps {
    data?: ComponentStockByLaboratory[];
    isLoading: boolean;
}

export function ComponentStockByLaboratoryTable({ data, isLoading }: ComponentStockByLaboratoryTableProps) {
    if (isLoading) return <LoadingSpinner text="Buscando estoque..." />;
    if (!data || data.length === 0) {
        return <p className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhuma quantidade lançada para este componente</p>;
    }

    const columns: ColumnDef<ComponentStockByLaboratory>[] = [
        { accessorKey: "laboratoryName", header: "Laboratório" },
        { accessorKey: "quantity", header: "Quantidade" },
        {
            id: "acoes",
            header: "Ações",
            cell: ({ row }) => {
                return (
                    <ActionsMenu
                        onDelete={() => console.log("Deletar estoque")}
                        onEdit={() => console.log("Editar estoque")}
                    />
                )
            }
        }
    ];

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-paragraph font-semibold">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="py-3 px-4 whitespace-nowrap">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="py-3 px-4 text-paragraph whitespace-nowrap">
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