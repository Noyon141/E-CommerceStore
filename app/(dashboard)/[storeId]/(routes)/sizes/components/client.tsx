"use client";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "../../settings/components/heading";
import { columns, sizeColumn } from "./columns";

interface SizeClientProps {
  data: sizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  // DECLARING HOOKS AND VARIABLES
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes(${data.length})`}
          description="Manage sizes of your store."
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <Heading title="API" description="API calls for sizes." />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};
