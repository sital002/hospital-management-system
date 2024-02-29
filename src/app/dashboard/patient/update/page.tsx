import React from "react";
import { UpdatePatientForm } from "./_components/UpdatePatientForm";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
<<<<<<< HEAD
=======
import PatientSignup from "@/app/auth/patient/signup/_components/PatientSignUp";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

export default async function page() {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  if (user.role !== "patient") redirect("/dashboard");
  if (user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.data.status === "rejected") return <p>Your account is rejected</p>;
  return (
    <div>
<<<<<<< HEAD
      <UpdatePatientForm update={true} patient={user.data} />
=======
      <PatientSignup update={true} patient={user.data} />
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    </div>
  );
}
