import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET (
    req: Request,
    { params }: { params: { employeeId: string }}
) {
    try {
        if(!params.employeeId) {
            return new NextResponse("Employee id is required", { status: 400 });
        }

        const product = await prismadb.employees.findUnique({
            where: {
                id: params.employeeId,
            },
            include: {
                store : true
            }
        })

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, employeeId: string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {
            name,
            salary,
            address,
            number
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!salary) new NextResponse("Salary is required", { status: 400});

        if (!address) new NextResponse("Address id is required", { status: 400});

        if (!number) new NextResponse("Number id is required", { status: 400});

        if(!params.employeeId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        // console.log("employ Id");
        // console.log(params)
        // console.log(params.storeId)

        const product = await prismadb.employees.update({
            where: {
                id: params.employeeId
            },
            data : {
                name,
                salary,
                address,
                number,
            }
        })

        // const product = await prismadb.employees.update({
        //     where: {
        //         id: params.employeeId
        //     },
        //     data: {
        //         images: {
        //             createMany: {
        //                 data: [
        //                     ...images.map((image: { url: string }) => image)
        //                 ]
        //             }
        //         }
        //     }
        // })

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

//// Delete Method

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, employeeId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!params.employeeId) {
            return new NextResponse("Product id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const employee = await prismadb.employees.deleteMany({
            where: {
                id: params.employeeId,
            }
        })

        return NextResponse.json(employee);
    } catch (err) {
        console.log('[PRODUCT_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}