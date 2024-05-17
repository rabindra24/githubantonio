import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, salary, address, number } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!salary) new NextResponse("Salary is required", { status: 400 });

    if (!address) new NextResponse("Address id is required", { status: 400 });

    if (!number) new NextResponse("Number id is required", { status: 400 });

    if (!params.storeId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        shopId: params.storeId,
        userId,
      },
    });

    console.log
    console.log(storeByUserId);

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // if (!storeByUserId) {
    //   return new NextResponse("Unauthorized", { status: 403 });
    // }

    const employee = await prismadb.employees.create({
      data: {
        name,
        address,
        number,
        salary,
        store: {
          connect: {
            id: params.storeId,
          },
        },
      },
    });

    console.log(employee);

    return NextResponse.json(employee);
  } catch (err) {
    console.log(`[PRODUCTS_POST] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    // const categoryId = searchParams.get("categoryId") || undefined;
    // const sizeId = searchParams.get("sizeId") || undefined;
    // const colorId = searchParams.get("colorId") || undefined;
    // const isFeatured = searchParams.get("isFeatured");

    const storeId = searchParams.get("storeId") || undefined;

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const employee = await prismadb.employees.findMany({
      where: {
        storeId,
      },
      include: {
        store: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employee);
  } catch (err) {
    console.log(`[PRODUCTS_GET] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
