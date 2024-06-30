"use server";
import { doctorZodSchema } from "@/app/dashboard/doctor/_utils/doctorSchema";
import connectToDB from "@/database/connectToDB";
import { Doctor } from "@/database/modals/DoctorModel";
import { getUserDetails } from "@/utils/Auth";

export async function addDoctor(body: any) {
  try {
    const user = await getUserDetails();
    if (!user) return { success: false, message: "You are not logged in" };
    if (user.role !== "admin" && user.role !== "staff")
      return { success: false, message: "You are not authorized" };
    const result = doctorZodSchema.safeParse(body);
    if (!result.success)
      return { success: false, message: "Form validation failed" };
    await connectToDB();
    const newPatient = await Doctor.create({
      ...result.data,
      addedBy: user.data.name,
    });
    return { success: true, message: "Doctor added successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateDoctor(id: string, body: any) {
  try {
    const user = await getUserDetails();
    if (!user) return { success: false, message: "You are not logged in" };
    if (
      user.role !== "admin" &&
      user.role !== "staff" &&
      user.role !== "doctor"
    )
      return { success: false, message: "You are not authorized" };

    if (user.role === "doctor" && user.data._id.toString() !== id) {
      return { success: false, message: "You are not authorized" };
    }
    const result = doctorZodSchema.safeParse(body);
    if (!result.success)
      return { success: false, message: "Form validation failed" };
    await connectToDB();

    const updatedPatient = await Doctor.findByIdAndUpdate(id, result.data);
    if (!updatedPatient) return { success: false, message: "Doctor not found" };
    return { success: true, message: "Doctor updated successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function deleteDoctor(id: string) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return { success: false, message: "You are not logged in" };
    }
    if (user.role !== "admin" && user.role !== "staff") {
      return { success: false, message: "You are not authorized" };
    }
    await connectToDB();
    const deletedPatient = await Doctor.findByIdAndDelete(id);
    if (deletedPatient) {
      return { success: true, message: "Account deleted successfully" };
    }
    return { success: false, message: "Doctor not found" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
