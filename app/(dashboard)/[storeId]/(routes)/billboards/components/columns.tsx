"use client";

import { ColumnDef } from "@tanstack/react-table";

export type billboardColumn = {
  id: string;
  label: string;
  date: string;
};

export const columns: ColumnDef<billboardColumn>[] = [
  {
    accessorKey: "label",
    header: "label",
  },
  {
    accessorKey: "createdAt",
    header: "date",
  },
];
