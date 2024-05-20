import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Heading } from "../../settings/components/heading";
import { columns, orderColumn } from "./columns";

interface OrderClientProps {
  data: orderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders(${data.length})`}
        description="Manage orders of your store."
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
