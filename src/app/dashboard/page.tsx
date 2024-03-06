import { Patient } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { PatientTable } from "@/components/data-table";
import Stats from "@/components/stats";
import { PatientDashboard } from "./_components/PatientDashboard";
import { getAllPatients } from "@/actions/patient";

export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role === "patient" && user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.role === "patient" && user.data.status === "rejected")
    return <p>Your account is rejected</p>;
  const data = await getAllPatients();

  console.log(data.length);

  return (
    <div className="px-2">
      {user.role === "patient" ? (
        <PatientDashboard patientId={user.data._id.toString()} />
      ) : (
        <>
          <Stats />
          <PatientTable users={JSON.stringify(data)} />
        </>
      )}
    </div>
  );
}
