import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { employeeId: string; storeId: string };
}) => {
  var employee = await prismadb.employees.findUnique({
    where: {
      id: params.employeeId,
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

  //   if (!employee) {
  //     employee = {
  //       id: "",
  //       name: "",
  //       storeId: "",
  //       salary: "",
  //       address: "",
  //       number: "",
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };
  //   }

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductForm
          initialData={employee || undefined}

          // colors={colors}
          // sizes={sizes}
          // categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductPage;
