import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/actions/get-user-id";
import { redirect } from "next/navigation";
const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  // console.log(id);
  // console.log(params.storeId);
  const colors = await prismadb.color.findMany({
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

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
