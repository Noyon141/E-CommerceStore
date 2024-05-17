"use client";

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "../../settings/components/heading";
import { categoryColumn, columns } from "./columns";

interface CategoryClientProps {
  data: categoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  // DECLARING HOOKS AND VARIABLES
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${data.length})`}
          description="Manage categories of your store."
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <Heading title="API" description="API calls for categories." />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};
