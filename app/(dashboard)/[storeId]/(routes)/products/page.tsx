import db from "@/lib/db";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { ProductClient } from "./components/client";
import { productColumn } from "./components/columns";

const Products = async ({ params }: { params: { storeId: string } }) => {
  //FETCH BILLBOARDS DATA AND ALSO THAT SHOULD BELONG TO THE STORE

  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: productColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    size: item.size.name,
    category: item.category.name,
    color: item.color.value,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
