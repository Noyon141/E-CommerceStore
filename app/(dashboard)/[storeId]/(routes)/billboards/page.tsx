import db from "@/lib/db";
import { format } from "date-fns";
import { BillboardClient } from "./components/client";
import { billboardColumn } from "./components/columns";

const Billboards = async ({ params }: { params: { storeId: string } }) => {
  //FETCH BILLBOARDS DATA AND ALSO THAT SHOULD BELONG TO THE STORE

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: billboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    date: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default Billboards;
