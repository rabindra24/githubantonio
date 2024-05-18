import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string, id: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      store: {
        shopId: storeId,
      },
      isPaid: true,
    },
  });

  return salesCount;
};


export const getSalesCountForAllStore = async (storeId: string, id: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      isPaid: true,
    },
  });

  return salesCount;
};

