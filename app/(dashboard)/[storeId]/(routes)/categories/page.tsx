import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { getUserId } from "@/actions/get-user-id";
import { auth } from "@clerk/nextjs";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const data = auth();

  const id = await getUserId(data?.userId);
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
      store: {
        shopId: id,
      },
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
