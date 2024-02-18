import connectToDB from "@/database/connectToDB";
import { ViewAppointment } from "./_components/ViewAppointment";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { Appointment } from "@/database/modals/Appointment";

async function getAppointments(id: string) {
  try {
    await connectToDB();
    const appointments = await Appointment.find({ patientId: id });
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
  const appointments = await getAppointments(user.data._id.toString());

  return (
    <div>
      <ViewAppointment appointments={appointments} />
    </div>
  );
}
