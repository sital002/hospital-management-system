import React from "react";
import { SignInAdmin } from "./_components/SignInAdmin";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUserDetails();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div>
      <SignInAdmin />
    </div>
  );
}
