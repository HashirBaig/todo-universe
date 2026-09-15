import { useState } from "react";
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { features, type DataTableFeatures } from "./DataTableFeatures";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}

function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useTable({
    features,
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="mt-4">
      <div className=" border-gray-800 rounded-2xl overflow-hidden">
        <Table className="table-fixed">
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-blue-100 text-md border-b-blue-400/10 hover:bg-blue-100/5 data-[state=selected]:bg-blue-400/10"
                >
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "select" ? "w-10 py-6" : "py-6"
                      }
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex-1 text-sm text-gray-400 mt-3">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}

export default DataTable;
