import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { getUserId } from "@/actions/get-user-id";
import { redirect } from "next/navigation";
import { getWeekGraphRevenue } from "@/actions/get-week-graph-revenue";
import { getTotalYearGraphRevenue } from "@/actions/get-total-year-graph-revenue";
import RevenueChart from "@/components/RevenueChart";
import GraphGroup from "@/components/GraphGroup";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  // const store = await prismadb.store.findFirst({
  //   where: { shopId: params.storeId },
  // });

  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const id = userId;

  const loginUserId = await getUserId(userId);
  // console.log(loginUserId);

  const totalRevenue = await getTotalRevenue(params.storeId, id);
  const salesCount = await getSalesCount(params.storeId, id);
  const stockCount = await getStockCount(params.storeId, id);
  const graphRevenue = await getGraphRevenue(params.storeId, id);
  const graphWeekRevenue = await getWeekGraphRevenue(params.storeId);
  const graphTotalYearRevenue = await getTotalYearGraphRevenue(params.storeId);

  // console.log(graphTotalYearRevenue)

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Products in Stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        {/* <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card> */}
        {/* <Overview data={graphTotalYearRevenue} /> */}
        {/* <Overview data={graphWeekRevenue} />
        <RevenueChart data={graphTotalYearRevenue}/> */}
        <GraphGroup graphTotalYearRevenue={graphTotalYearRevenue} graphWeekRevenue={graphWeekRevenue} graphRevenue={graphRevenue}/>
      </div>
    </div>
  );
};

export default DashboardPage;
