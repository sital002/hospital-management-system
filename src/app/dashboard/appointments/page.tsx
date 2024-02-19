import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import React from "react";
import { AppointmentTable } from "./_components/AppointmentTable";
import connectToDB from "@/database/connectToDB";
import axios from "axios";
import { TAppointment } from "@/database/modals/Appointment";

async function getAllAppointments() {
  try {
    await connectToDB();
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/appointment/new`,
      {
        withCredentials: true,
      },
    );
    return res.data ?? [];
  } catch (err: any) {
    console.log(err.response.data.message);
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
  console.log("The appointmens", appointments[0]);
  return (
    <div>
      <AppointmentTable appointments={appointments} />
    </div>
  );
}
