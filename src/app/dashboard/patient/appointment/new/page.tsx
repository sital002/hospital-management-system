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
  return (
    <div>
      <NewAppointementForm patientId={user.data._id.toString()} />
    </div>
  );
}
