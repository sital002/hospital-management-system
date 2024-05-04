import connectToDB from "@/database/connectToDB";
import { ViewAppointment } from "./_components/ViewAppointment";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { Appointment } from "@/database/modals/Appointment";
import { AppointmentTable } from "../../appointments/_components/AppointmentTable";

async function getAppointments(id: string) {
  try {
    await connectToDB();

    const appointments = await Appointment.find({ patient: id })
      .sort({
        date: "desc",
      })
      .populate("patient");
    // console.log(appointments);
    return appointments;
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
}
export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role !== "patient")
    return <div>You are not authorized to view this page</div>;
  if (user.role === "patient" && user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.role === "patient" && user.data.status === "rejected")
    return <p>Your account is rejected</p>;
  const appointments = await getAppointments(user.data._id.toString());
  console.log(appointments);

  return (
    <div>
      <AppointmentTable data={JSON.stringify(appointments)} />
    </div>
  );
}
