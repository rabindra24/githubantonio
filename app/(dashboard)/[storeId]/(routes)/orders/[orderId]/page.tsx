import prismadb from "@/lib/prismadb";
import { OrderForm } from "./components/order-form";
import { ProductForm } from "../../employees/[employeeId]/components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { orderId: string; storeId: string };
}) => {
  const orders = await prismadb.employees.findUnique({
    where: {
      id: params.orderId,
    },
    // include: {
    //     images: true
    // }
  });

  // const categories = await prismadb.category.findMany({
  //     where: {
  //         storeId: params.storeId
  //     },
  // })

  // const sizes = await prismadb.size.findMany({
  //     where: {
  //         storeId: params.storeId
  //     },
  // })

  // const colors = await prismadb.color.findMany({
  //     where: {
  //         storeId: params.storeId
  //     },
  // })

  //   console.log("eekjjkjkjk");

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderForm
          initialData={orders}

          // colors={colors}
          // sizes={sizes}
          // categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductPage;
