"use client";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "../../settings/components/heading";
import { colorColumn, columns } from "./columns";

interface SizeClientProps {
  data: colorColumn[];
}

export const ColorClient: React.FC<SizeClientProps> = ({ data }) => {
  // DECLARING HOOKS AND VARIABLES
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors(${data.length})`}
          description="Manage colors of your store."
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <Heading title="API" description="API calls for colors." />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};
