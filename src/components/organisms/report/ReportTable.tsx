import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ComponentReportItem } from "@/domain/repositories/ComponentRepository";
import { LoadingSpinner } from "@/components/molecules/LoadingSpinner";

interface ReportTableProps {
  data: ComponentReportItem[];
  isLoading: boolean;
  startDateDisplay: string;
  endDateDisplay: string;
}

export function ReportTable({ data, isLoading, startDateDisplay, endDateDisplay }: ReportTableProps) {
  const columns: ColumnDef<ComponentReportItem>[] = [
    {
      accessorKey: "name",
      header: "Descrição do Material",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.original.name}</span>
          <span className="text-sm text-gray-500 truncate max-w-xs block">
            Ref: {row.original.reference}
          </span>
          {row.original.description && (
            <span className="text-xs text-gray-400 truncate max-w-xs block">
              {row.original.description}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "stockAtStart",
      header: `Quantidade em: ${startDateDisplay}`,
    },
    {
      accessorKey: "stockAtEnd",
      header: `Quantidade em: ${endDateDisplay}`,
    },
    {
      accessorKey: "consumedInPeriod",
      header: "Quantidade Consumida no Período",
      cell: ({ row }) => (
        <span className="text-red-600 font-semibold">{row.original.consumedInPeriod}</span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <LoadingSpinner text="Buscando registro(s) de consumo de componente(s)..." />;
  if (data.length === 0) {
    return <p className="flex flex-col text-center items-center justify-center h-[15vh] gap-4 p-8 text-paragraph">Nenhum consumo de componente foi registrado no período especificado</p>;
  }

  return (
    <table className="w-full text-sm text-left">
      <thead className="border-b border-border text-paragraph font-semibold">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="py-3 px-4 text-paragraph whitespace-nowrap">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
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
