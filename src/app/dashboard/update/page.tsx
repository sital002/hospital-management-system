import PatientForm from "@/components/PatientForm";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";
import PatientSignup from "@/app/auth/patient/signup/_components/PatientSignUp";
import StaffForm from "@/components/StaffForm";
import DoctorForm from "@/components/DoctorForm";
import LabTechnicianForm from "@/components/LabTechnicianForm";
import { AdminForm } from "./_components/AdminForm";
import connectToDB from "@/database/connectToDB";
import { Admin, AdminType } from "@/database/modals/AdminModal";
import { AdminFormSchema } from "../labtechnician/_utils/AdminFormSchema";

export default async function page() {
  const user = await getUserDetails();
  const handleAdminUpdate = async (data: any) => {
    "use server";
    try {
      await connectToDB();
      const result = AdminFormSchema.safeParse(data);
      if (!result.success) {
        return {
          message: "Invalid data",
          success: false,
        };
      }
      console.log("The data", result);
      const updatedData = await Admin.findByIdAndUpdate(
        user?.data._id,
        result.data,
      );
      if (!updatedData) {
        return {
          message: "Admin not updated",
          success: false,
        };
      }
      return {
        message: "Admin updated",
        success: true,
      };
    } catch (err) {
      console.log(err);
      return {
        message: "Something went wrong",
        success: false,
      };
    }
  };
  if (!user) {
    redirect("/signin");
  }
  if (user.role === "patient")
    return <PatientSignup update={true} patient={user.data} />;
  if (user.role === "staff")
    return <StaffForm staff={user.data} update={true} />;
  if (user.role === "doctor")
    return <DoctorForm doctor={user.data} update={true} />;
  if (user.role === "labtechnician")
    return <LabTechnicianForm update={true} labtechnician={user.data} />;
  if (user.role === "admin")
    return (
      <AdminForm
        update={true}
        user={user.data}
        handleAdminUpdate={handleAdminUpdate}
      />
    );
  return <div>Something went wrong</div>;
}
