import prismadb from "@/lib/prismadb";

export const getProductList = async (storeId: string, id: string) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: id,
      store: {
        shopId: storeId,
      },
    },
  });

  return products;
};
