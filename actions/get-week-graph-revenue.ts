import prismadb from "@/lib/prismadb";
import { format, subDays } from "date-fns"; 

interface GraphData {
  name: string;
  total: number;
}

export const getWeekGraphRevenue = async (storeId: string) => {
    const startDate = subDays(new Date(), 7);

    const paidOrders = await prismadb.order.findMany({
      where: {
        storeId,
        isPaid: true,
        createdAt: {
          gte: startDate,
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
  
    const dailyRevenue: { [key: string]: number } = {};
  
    for (const order of paidOrders) {
      const date = order.createdAt.toISOString().split('T')[0];
      let revenueForOrder = 0;
  
      for (const item of order.orderItems) {
        revenueForOrder += Number(item.product.price);
      }
  
      dailyRevenue[date] = (dailyRevenue[date] || 0) + revenueForOrder;
    }
  
    const graphData: GraphData[] = [];
  
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayName = format(date, 'EEE'); // Get the day name (Mon, Tue, etc.)
      const dateString = date.toISOString().split('T')[0];
      graphData.push({
        name: dayName,
        total: dailyRevenue[dateString] || 0,
      });
    }
  
    return graphData;
};
