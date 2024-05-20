import { ColumnDef } from "@tanstack/react-table";

export type orderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  products: string;
  totalPrice: string;
  createdAt: string;
};

export const columns: ColumnDef<orderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
