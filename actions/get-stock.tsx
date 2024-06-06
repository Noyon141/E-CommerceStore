import db from "@/lib/db";

export const getStock = async (storeId: string) => {
  const leftProducts = await db.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return leftProducts;
};
