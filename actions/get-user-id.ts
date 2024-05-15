import prismadb from "@/lib/prismadb";

export const getUserId = async (userId: string) => {
    const user = await prismadb.store.findFirst({
        where: {
           userId
        },
    });

    return user?.id;
}