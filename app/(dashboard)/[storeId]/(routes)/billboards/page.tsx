import db from "@/lib/db";
import { BillboardClient } from "./components/client";

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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};

export default Billboards;
