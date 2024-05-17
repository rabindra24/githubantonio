import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/actions/get-user-id";
import { redirect } from "next/navigation";
import { getUserShopId } from "@/actions/get-user-store-id";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  const data = auth();

  // const id = await getUserId(userId );

  if (!userId) {
    redirect("/sign-in");
  }

  // console.log(userId);

  const store = await prismadb?.store?.findFirst({
    where: {
      id: params.storeId,
    },
  });

  // console.log(store);

  // if (store) {
  //   redirect(`/${store.shopId}`); // Add shopId instead of Id to get particular shop data
  // }

  // console.log(userId);
  // console.log(params?.storeId);

  console.log(params.storeId);
  console.log(userId);

  const getUserStore = await getUserShopId(params.storeId);

  console.log(getUserStore);

  const employees = await prismadb.employees.findMany({
    where: {
      storeId: params.storeId,
      // store: {
      //   userId: getUserStore,
      // },
    },
    include: {
      store: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(employees);

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
