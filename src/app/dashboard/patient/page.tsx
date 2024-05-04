import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { PatientTable } from "@/components/data-table";
import Stats from "@/components/stats";
import { getAllPatients } from "@/actions/patient";

export default async function Dashboard() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");

  const data = await getAllPatients();
  console.log(data);
  return (
    <div className="px-2">
      <Stats />
      <PatientTable users={(data)} />
    </div>
  );
}
