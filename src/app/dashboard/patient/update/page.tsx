import React from "react";
import { UpdatePatientForm } from "./_components/UpdatePatientForm";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  if (user.role !== "patient") redirect("/dashboard");
  if (user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.data.status === "rejected") return <p>Your account is rejected</p>;
  return (
    <div>
      <UpdatePatientForm update={true} patient={user.data} />
    </div>
  );
}
