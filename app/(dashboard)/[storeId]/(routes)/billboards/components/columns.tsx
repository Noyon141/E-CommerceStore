"use client";

import { ColumnDef } from "@tanstack/react-table";

export type billboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<billboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
