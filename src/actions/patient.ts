"use server";

import { AppointmentFormSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import { Appointment } from "@/database/modals/Appointment";
import { getUserDetails } from "@/utils/Auth";

export async function addPatient() {}

export async function updatePatient() {}

export async function deletePatient() {}

export async function bookAppointment(data: any) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return { success: false, message: "You are not logged in" };
    }
    console.log(user);
    if (user.role !== "patient") {
      return { success: false, message: "You are not authorized" };
    }
    if (user.data.status !== "approved" && user.data.status !== "active") {
      return { success: false, message: "Your account is not active" };
    }

    const result = AppointmentFormSchema.safeParse(data);
    if (!result.success) {
      return { success: false, message: result.error.message };
    }
    const newAppointment = await Appointment.create({
      patient: user.data._id,
      contactPreference: result.data.contact,
      date: result.data.date,
      medicalDepartment: result.data.type,
      status: "pending",
    });
    return { success: true, appointment: newAppointment };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function viewAllAppointments() {}
