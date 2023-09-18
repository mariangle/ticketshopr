"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Ticket } from "../data/schema"
import { RowActions } from "./data-table-row-actions"
import { issues, priorities, statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { Badge } from "@/components/ui/badge"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "Ticket",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      const issue = issues.find((issue) => issue.value === row.original.issue)

      return (
        <div className="flex space-x-2">
          {issue && <Badge variant="outline">{issue.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("subject")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "tech",
    header: "Tech",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "last_updated",
    header: "Last Updated",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions<Ticket> data={row.original}/>,
  },
]