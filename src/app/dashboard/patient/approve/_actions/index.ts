"use server";

import connectToDB from "@/database/connectToDB";
import { Patient } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";

export const handlePatientApproveStatus = async (id: string) => {
  const user = await getUserDetails();
  if (!user) return;
  if (user.role !== "admin") return;
  await connectToDB();
  const patient = await Patient.findByIdAndUpdate(id, {
    status: "approved",
  });
  console.log(patient);
};

export const handlePatientRejectStatus = async (id: string) => {
  const user = await getUserDetails();
  if (!user) return;
  if (user.role !== "admin") return;
  await connectToDB();

  const patient = await Patient.findByIdAndUpdate(id, {
    status: "rejected",
  });
};
