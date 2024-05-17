"use client";
import { useSession } from "@clerk/nextjs";

export const useRole = () => {
  const { session } = useSession();
  const role: any = session?.user?.organizationMemberships[0]?.role;

  if (role === "org:admin") {
    return "ADMIN";
  }

  console.log("session");
  console.log(session);

  if (role === "org:member") {
    return "MEMBER";
  }

  return "";
};
