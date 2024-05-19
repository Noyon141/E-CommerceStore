"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellActions } from "./cell-actions";

export type productColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  size: string;
  category: string;
  color: string;
  createdAt: string;
};

export const columns: ColumnDef<productColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-5 w-5 border rounded-full"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
