import prismadb from "@/lib/prismadb";

export const getUserShopId = async (shopId: string) => {
    const user = await prismadb.store.findFirst({
        where: {
           shopId
        },
    });

    // console.log(user)

    return user?.userId;
}