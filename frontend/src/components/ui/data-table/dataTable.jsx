import React from "react";
import { useTable } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { dataTableFeatures } from '@/components/ui/data-table/dataTableFeatures';
import { cn } from "cn";

export function DataTable({columns, data}) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
   const table = useTable({
    data,
    columns,
    features: dataTableFeatures,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  })
  return(
    <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col rounded-md border">
            <Table containerClassName="min-h-0 flex-1 overflow-auto">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                        <TableHead 
                            key={header.id}
                            className={cn(
                              "sticky top-0 z-10 bg-background",
                              header.column.columnDef.meta?.className,
                            )}
                            >
                            {header.isPlaceholder ? null : (
                            <table.FlexRender header={header} />
                            )}
                        </TableHead>
                        ))}
                    </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell 
                                  key={cell.id}
                                  className=
                                  {cell.column.columnDef.meta?.className}
                                >
                                <table.FlexRender cell={cell} />
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                            Nessun risultato.
                            </TableCell>
                        </TableRow>
                        )}
                </TableBody>
            </Table>
        </div>
    </div>
  )
}
