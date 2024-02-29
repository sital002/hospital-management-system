import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";
import PatientDetailCard from "@/components/patientDetails/PatientDetailCard";
import { LabtechnicianDetailCard } from "./_components/LabtechnicianDetailCard";
import { AdminDetailCard } from "./_components/AdminDetailCard";
import { StaffDetailCard } from "./_components/StaffDetailCard";
import { DoctorDetailCard } from "./_components/DoctorDetailCard";
export default async function page() {
  const user = await getUserDetails();
  if (!user) {
    redirect("/signin");
  }
  if (user.role === "patient") return <PatientDetailCard patient={user.data} />;
  if (user.role === "staff") return <StaffDetailCard staff={user.data} />;
  if (user.role === "doctor") return <DoctorDetailCard doctor={user.data} />;
  if (user.role === "labtechnician")
    return <LabtechnicianDetailCard labtechnician={user.data} />;
  if (user.role === "admin") return <AdminDetailCard admin={user.data} />;
  return <div>SOmething went wrong</div>;
}
