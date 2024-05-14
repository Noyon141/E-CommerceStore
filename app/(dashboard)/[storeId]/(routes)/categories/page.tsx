import db from "@/lib/db";
import { format } from "date-fns";
import { CategoryClient } from "./components/client";
import { categoryColumn } from "./components/columns";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  //FETCH BILLBOARDS DATA AND ALSO THAT SHOULD BELONG TO THE STORE

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: categoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
