import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

import { type TypeTaskList } from "@/lib/const";
import { type DataTableFeatures } from "./DataTableFeatures";

const columnHelper = createColumnHelper<DataTableFeatures, TypeTaskList>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
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
              ? "line-through text-gray-500 text-lg"
              : "text-gray-100 text-lg"
          }
        >
          {row?.original?.task}
        </span>

        <div className="flex items-center gap-2">
          {getValue() ? (
            <Badge className="bg-amber-500/10 text-red-500 border-red-500/20">
              <Star className="size-4" />
              <span>Important</span>
            </Badge>
          ) : null}
        </div>
      </div>
    ),
  }),
]);
