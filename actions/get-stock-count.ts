import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string, id: string) => {
  const salesCount = await prismadb.product.count({
    where: {
      storeId,
      store: {
        shopId: storeId,
      },
      isArchived: true,
    },
  });

  return salesCount;
};

export const getStockCountForAllStore = async (storeId: string, id: string) => {
  const salesCount = await prismadb.product.count({});

  return salesCount;
};
