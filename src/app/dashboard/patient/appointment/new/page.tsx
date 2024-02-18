import React from "react";
import { NewAppointementForm } from "../_components/NewAppointementForm";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  if (user.role !== "patient") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  if (user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.data.status === "rejected") return <p>Your account is rejected</p>;
  return (
    <div>
      <NewAppointementForm patient={user.data} />
    </div>
  );
}
