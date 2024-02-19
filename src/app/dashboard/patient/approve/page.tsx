import { Patient } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { PatientStatusTable } from "./_components/patient-status-table";
import connectToDB from "@/database/connectToDB";

async function getPatients() {
  try {
    await connectToDB();
    const patients = await Patient.find({ status: "pending" });
    console.log(patients);
    return patients ?? [];
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
}
export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role !== "admin") {
    return (
      <div>
        <p className="my-3">You are not authorized to view this page</p>
        <Link
          href="/dashboard"
          className=" rounded-md bg-primary p-3 text-primary-foreground"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }
  const patients = await getPatients();
  //   console.log(patients);
  return (
    <div>
      <PatientStatusTable patients={patients} />
    </div>
  );
}
