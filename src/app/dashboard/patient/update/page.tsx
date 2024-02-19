import React from "react";
import { UpdatePatientForm } from "./_components/UpdatePatientForm";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import PatientSignup from "@/app/auth/patient/signup/_components/PatientSignUp";

export default async function page() {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  if (user.role !== "patient") redirect("/dashboard");
  if (user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.data.status === "rejected") return <p>Your account is rejected</p>;
  return (
    <div>
      <PatientSignup update={true} patient={user.data} />
    </div>
  );
}
