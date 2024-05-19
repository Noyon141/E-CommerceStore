"use client";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "../../settings/components/heading";
import { productColumn, columns } from "./columns";

interface ProductClientProps {
  data: productColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  // DECLARING HOOKS AND VARIABLES
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products(${data.length})`}
          description="Manage products of your store."
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator className=""/>
      <Heading title="API" description="API calls for products." />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
