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
    return appointments ?? [];
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
  if (user.role !== "admin" && user.role !== "staff") {
    return <p> You arenot authorized to view this page</p>;
  }
  const appointments = (await getAllAppointments()) as TAppointment[];
  // console.log("The appointmens", appointments[0]);
  return (
    <div>
      <AppointmentTable data={JSON.stringify(appointments)} />
    </div>
  );
}
