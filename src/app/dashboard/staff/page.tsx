import { Sidebar } from "@/components/sidebar";
import { type StaffType } from "@/database/modals/StaffModal";
import { getUserDetails } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StaffTable } from "@/components/staff-data-table";
import Stats from "@/components/stats";
import { getAllUsers as getPatients } from "@/app/dashboard/patient/page";
import { getAllUsers as getDoctors } from "@/app/dashboard/doctor/page";

const getAllUsers = async () => {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`, {
      // cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: `auth_token=${authToken};`,
      },
    });
    const data = (await res.json()) as StaffType[];
    return data;
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
};
export default async function Dashboard() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");

  const data = await getAllUsers();

  const patient = await getPatients();

  const totalPatient = patient.length;
  const inPatient = patient.filter(
    (item, index) => item.patientType === "inpatient",
  );
  const doctor = await getDoctors();
  return (
    <div className="px-2">
      <Stats
        totalPatient={totalPatient}
        inPatient={inPatient.length}
        doctor={doctor.length}
      />
      <StaffTable users={data} />
    </div>
  );
}
