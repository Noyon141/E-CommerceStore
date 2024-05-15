import db from "@/lib/db";
import { format } from "date-fns";
import { SizeClient } from "./components/client";
import { sizeColumn } from "./components/columns";

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  //FETCH BILLBOARDS DATA AND ALSO THAT SHOULD BELONG TO THE STORE

  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: sizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default Sizes;
