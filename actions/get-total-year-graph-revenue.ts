import prismadb from "@/lib/prismadb";
import { subYears } from "date-fns";

interface RevenueData {
  year: string;
  [month: string]: number;
}

export const getTotalYearGraphRevenue = async (storeId: string): Promise<RevenueData[]> => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Fetch paid orders for the last 5 years
  const revenueData: RevenueData[] = [];
  for (let year = currentYear - 4; year <= currentYear; year++) {
    const startDate = new Date(year, 0, 1); // January 1st of the current year
    const endDate = new Date(year, 11, 31); // December 31st of the current year

    const paidOrders = await prismadb.order.findMany({
      where: {
        storeId,
        isPaid: true,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const monthlyRevenue: { [month: string]: number } = {};
    for (const order of paidOrders) {
      const month = order.createdAt.getMonth(); // 0-based index
      const revenueForOrder = order.orderItems.reduce((total, item) => total + Number(item.product.price), 0);
      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = revenueForOrder;
      } else {
        monthlyRevenue[month] += revenueForOrder;
      }
    }

    const formattedData: RevenueData = {
      year: year.toString(),
      Jan: monthlyRevenue[0] || 0,
      Feb: monthlyRevenue[1] || 0,
      Mar: monthlyRevenue[2] || 0,
      Apr: monthlyRevenue[3] || 0,
      May: monthlyRevenue[4] || 0,
      Jun: monthlyRevenue[5] || 0,
      Jul: monthlyRevenue[6] || 0,
      Aug: monthlyRevenue[7] || 0,
      Sep: monthlyRevenue[8] || 0,
      Oct: monthlyRevenue[9] || 0,
      Nov: monthlyRevenue[10] || 0,
      Dec: monthlyRevenue[11] || 0,
    };

    revenueData.push(formattedData);
  }

  console.log(revenueData)

  return revenueData;
};
