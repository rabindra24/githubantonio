"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useRole } from "@/hooks/use-role";
// import { ApiList } from "@/components/ui/api-list"

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const role = useRole();

  // console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Employee (${data?.length})`}
          description="Manage Employee for your store"
        />

        {role === "ADMIN" && (
          <Button
            onClick={() => router.push(`/${params.storeId}/employees/new`)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        )}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      {/* <Heading title="API" description="API calls for Products" /> */}
      {/* <Separator /> */}
      {/* <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
