import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import { type TypeTaskList } from "@/lib/const";
import { type DataTableFeatures } from "./DataTableFeatures";

const columnHelper = createColumnHelper<DataTableFeatures, TypeTaskList>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("task", {
    header: "Task",
    cell: ({ row, getValue }) => (
      <div className="flex flex-col justify-center space-y-3">
        <span
          className={
            row.original.isCompleted
              ? "line-through text-gray-500"
              : "text-gray-100"
          }
        >
          {row?.original?.task}
        </span>

        <div className="flex items-center gap-2">
          {getValue() ? (
            <Badge className="bg-amber-500/10 text-red-500 border-red-500/20 text-md p-4">
              Important
            </Badge>
          ) : null}

          {getValue() ? (
            <Badge className="bg-lime-500/10 text-lime-500 border-lime-500/20 text-md p-4">
              Completed
            </Badge>
          ) : (
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-md p-4">
              Pending
            </Badge>
          )}
        </div>
      </div>
    ),
  }),
]);
