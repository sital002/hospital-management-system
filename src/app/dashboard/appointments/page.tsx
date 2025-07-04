import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";
import { AppointmentTable } from "./_components/AppointmentTable";
import connectToDB from "@/database/connectToDB";
import { Appointment, TAppointment } from "@/database/modals/Appointment";

async function getAllAppointments() {
  try {
    await connectToDB();
    const appointments = await Appointment.find().populate("patient");
    return JSON.parse(JSON.stringify(appointments)) ?? [];
  } catch (err) {
    console.log(err);
    return [];
  }
}
export default async function page() {
  const user = await getUserDetails();
  if (!user) {
    redirect("/signin");
  }
  if (
    user.role !== "admin" &&
    user.role !== "staff" &&
    user.role !== "doctor"
  ) {
    return <p> You arenot authorized to view this page</p>;
  }
  const appointments = (await getAllAppointments()) as TAppointment[];
  return (
    <div>
      <AppointmentTable data={appointments} />
    </div>
  );
}
