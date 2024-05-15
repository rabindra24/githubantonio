import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/actions/get-user-id";
import { redirect } from "next/navigation";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
      store: {
        shopId: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
