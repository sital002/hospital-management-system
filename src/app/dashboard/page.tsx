import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { PatientTable } from "@/components/data-table";
import Stats from "@/components/stats";
import { PatientDashboard } from "./_components/PatientDashboard";
import { getAllPatients } from "@/actions/patient";
import { DoctorDashboard } from "./doctor/_components/DoctorDashboard";
import { LabtechnicianDashboard } from "./_components/LabtechnicianDashboard";

export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role === "patient" && user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.role === "patient" && user.data.status === "rejected")
    return <p>Your account is rejected</p>;
  const data = await getAllPatients();

  if (user.role === "doctor")
    return (
      <div className="px-2">
        <DoctorDashboard data={data} doctorId={user.data._id.toString()} />
      </div>
    );
  if (user.role === "labtechnician")
    return (
      <div className="px-2">
        <LabtechnicianDashboard
          data={data}
          labtechnicianId={user.data._id.toString()}
        />
      </div>
    );
  return (
    <div className="px-2">
      {user.role === "patient" ? (
        <PatientDashboard patientId={user.data._id.toString()} />
      ) : (
        <>
          <Stats />
          <PatientTable users={data} />
        </>
      )}
    </div>
  );
}
