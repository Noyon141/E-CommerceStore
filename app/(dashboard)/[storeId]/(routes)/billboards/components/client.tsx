"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "../../settings/components/heading";

export const BillboardClient = () => {
  // DECLARING HOOKS AND VARIABLES
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards: (0)"
          description="Manage billboards of your store."
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
    </>
  );
};
