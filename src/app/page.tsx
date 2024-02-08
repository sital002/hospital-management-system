import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const user = await getUserDetails();
  if (!user) redirect("/auth/admin");
  redirect("/dashboard");
}
