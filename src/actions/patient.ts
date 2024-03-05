"use server";

import { AppointmentFormSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import connectToDB from "@/database/connectToDB";
import { Appointment } from "@/database/modals/Appointment";
import { Patient } from "@/database/modals/PatientModel";
import { AdmitPatientSchema } from "@/schema/patient";
import { getUserDetails } from "@/utils/Auth";

export async function addPatient(body: any) {
  try {
    const user = await getUserDetails();
    if (!user) return { success: false, message: "You are not logged in" };
    if (user.role !== "admin" && user.role !== "staff")
      return { success: false, message: "You are not authorized" };
    const result = AdmitPatientSchema.safeParse(body);
    if (!result.success)
      return { success: false, message: "Form validation failed" };
    await connectToDB();
    const newPatient = await Patient.create(result.data);
    return { success: true, message: "Patient added successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updatePatient(id: string, body: any) {
  try {
    const user = await getUserDetails();
    if (!user) return { success: false, message: "You are not logged in" };
    if (user.role !== "admin" && user.role !== "staff")
      return { success: false, message: "You are not authorized" };
    const result = AdmitPatientSchema.safeParse(body);
    if (!result.success)
      return { success: false, message: "Form validation failed" };
    await connectToDB();

    const updatedPatient = await Patient.findByIdAndUpdate(id, result.data);
    if (!updatedPatient)
      return { success: false, message: "Patient not found" };
    return { success: true, message: "Patient updated successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function deletePatient(id: string) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return { success: false, message: "You are not logged in" };
    }
    if (user.role !== "admin" && user.role !== "staff") {
      return { success: false, message: "You are not authorized" };
    }
    await connectToDB();
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (deletedPatient) {
      return { success: true, message: "Patient deleted successfully" };
    }
    return { success: false, message: "Patient not found" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function bookAppointment(data: any) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return { success: false, message: "You are not logged in" };
    }
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
    await connectToDB();

    const newAppointment = await Appointment.create({
      patient: user.data._id,
      contactPreference: result.data.contact,
      date: result.data.date,
      medicalDepartment: result.data.type,
      status: "pending",
    });
    return { success: true, message: "Appointment created successfully" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
