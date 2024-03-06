"use server";

import { StaffFormSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import connectToDB from "@/database/connectToDB";
import { Staff } from "@/database/modals/StaffModal";
import { getUserDetails } from "@/utils/Auth";

export async function addStaff(body: any) {
  try {
    const user = await getUserDetails();
    if (!user) return { success: false, message: "You are not logged in" };
    if (user.role !== "admin")
      return { success: false, message: "You are not authorized" };
    const result = StaffFormSchema.safeParse(body);
    if (!result.success)
      return { success: false, message: "Form validation failed" };
    await connectToDB();
    const staffExists = await Staff.findOne({ email: result.data.email });
    if (staffExists) return { success: false, message: "Staff already exists" };
    const newStaff = await Staff.create(result.data);
    return { success: true, message: "Staff added successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateStaff(id: string, body: any) {
  try {
    const user = await getUserDetails();
    if (!user) return { success: false, message: "You are not logged in" };
    if (user.role !== "admin")
      return { success: false, message: "You are not authorized" };
    const result = StaffFormSchema.safeParse(body);
    if (!result.success)
      return { success: false, message: "Form validation failed" };
    await connectToDB();

    const updatedStaff = await Staff.findByIdAndUpdate(id, result.data);
    if (!updatedStaff) return { success: false, message: "Staff not found" };
    return { success: true, message: "Staff updated successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function deleteStaff(id: string) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return { success: false, message: "You are not logged in" };
    }
    if (user.role !== "admin") {
      return { success: false, message: "You are not authorized" };
    }
    await connectToDB();
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (deletedStaff) {
      return { success: true, message: "Staff deleted successfully" };
    }
    return { success: false, message: "Staff not found" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
