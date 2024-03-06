import StaffForm from "@/components/StaffForm";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role !== "admin")
    return <p>You arenot authorized to view this page</p>;
  return (
    <div>
      <StaffForm update={false} />
    </div>
  );
}
