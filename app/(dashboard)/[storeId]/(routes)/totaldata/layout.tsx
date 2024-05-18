
"use client"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import { useRole } from "@/hooks/use-role";

interface DashboardType {
  children: React.ReactNode;
  params: { storeId: string };
}

export default  function Dashboard({ children, params }: DashboardType) {
//   const { userId } = auth();

//   if (!userId) {
//     redirect("/sign-in");
//   }

//   const store = await prismadb?.store.findFirst({
//     where: {
//       // id : params.storeId,
//       // shopId: params.storeId,
//       userId,
//     },
//   });

//   if (!store) {
//     redirect("/");
//   }

   const role = useRole();

   if(role !== 'ADMIN'){
    return <div className="w-full h-screen text-center justify-center items-center">

     <h1>You are not authorised to access these</h1>
    </div>
   }

  return (
    <>
      {/* <Navbar storeId={params.storeId} /> */}
      {children}
    </>
  );
}
