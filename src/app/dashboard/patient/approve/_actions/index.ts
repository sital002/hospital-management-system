"use server";

import connectToDB from "@/database/connectToDB";
import { Patient } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";

export const handlePatientApproveStatus = async (id: string) => {
  const user = await getUserDetails();
  if (!user) return;
  if (user.role === "admin" || user.role === "staff") {
    await connectToDB();
    const patient = await Patient.findByIdAndUpdate(id, {
      status: "approved",
    });
    if (patient) {
      return { success: true, message: "Profile approved successfully" };
    }
    return { success: true, messgae: "Something went wrong" };
    // console.log(patient);
  }
};

export const handlePatientRejectStatus = async (id: string) => {
  const user = await getUserDetails();
  if (!user) return;
  if (user.role === "admin" || user.role === "staff") {
    await connectToDB();

    const patient = await Patient.findByIdAndUpdate(id, {
      status: "rejected",
    });
  }
};
