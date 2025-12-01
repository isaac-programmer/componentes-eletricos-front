"use client";

import { ComponentStockByLaboratory } from "@/domain/entities/stock";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { LoadingSpinner } from "../../molecules/LoadingSpinner";
import { ActionsMenuStockTransactions } from "../../molecules/ActionsMenuStockTransactions";
import { useMemo } from "react";
import { useAuthentication } from "@/contexts/AuthenticationContext";

interface ComponentStockByLaboratoryTableProps {
    data?: ComponentStockByLaboratory[];
    isLoading: boolean;
    onAddStock: (laboratoryId: string) => void;
    onConsumeStock: (laboratoryId: string) => void;
    onTransferStock: (laboratoryId: string) => void;
}

export function ComponentStockByLaboratoryTable({
    data,
    isLoading,
    onAddStock,
    onConsumeStock,
    onTransferStock
}: ComponentStockByLaboratoryTableProps) {
    const { user } = useAuthentication();
    const isMonitor = useMemo(() => user?.group?.name === "Monitor", [user]);

    const columns: ColumnDef<ComponentStockByLaboratory>[] = [
        { accessorKey: "laboratoryName", header: "Laboratório" },
        { accessorKey: "quantity", header: "Quantidade" },
    ];

    if (!isMonitor) {
        columns.push({
            id: "acoes",
            header: "Ações",
            cell: ({ row }) => {
                const laboratoryId = row.original.laboratoryId;
                return (
                    <ActionsMenuStockTransactions
                        onAddStock={() => onAddStock(laboratoryId)}
                        onConsumeStock={() => onConsumeStock(laboratoryId)}
                        onTransferStock={() => onTransferStock(laboratoryId)}
                    />
                )
            }
        })
    }

    const table = useReactTable({ data: data ?? [], columns, getCoreRowModel: getCoreRowModel() });

    if (isLoading) return <LoadingSpinner text="Buscando estoque..." />;
    if (!data || data.length === 0) {
        return <p className="flex flex-col items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhuma quantidade lançada para este componente</p>;
    }

    return (
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
    );
}