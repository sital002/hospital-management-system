"use server";
import connectToDB from "@/database/connectToDB";
import { Appointment, TAppointment } from "@/database/modals/Appointment";

export async function getAllAppointments() {
  try {
    await connectToDB();
    const appointments =
      await Appointment.find<TAppointment>().populate("patient");
    return appointments ?? [];
  } catch (err: any) {
    console.log(err);
    return [];
  }
}
