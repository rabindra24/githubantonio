import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/actions/get-user-id";
import { redirect } from "next/navigation";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const data = auth();
  const { userId } = auth();

  const id = await getUserId(data?.userId);

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb?.store?.findFirst({
    where: {
      userId,
    },
  });

  // if (store) {
  //   redirect(`/${store.shopId}`); // Add shopId instead of Id to get particular shop data
  // }

  console.log(id);
  console.log(params?.storeId);

  const employees = await prismadb.employees.findMany({
    where: {
      storeId: params.storeId,
      store: {
        shopId: id,
      },
    },
    include: {
      store: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(products);

  const formattedProducts: ProductColumn[] = employees.map((item) => ({
    id: item.id,
    name: item.name,
    salary: item.salary,
    address: item.address,
    number: item.number,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
