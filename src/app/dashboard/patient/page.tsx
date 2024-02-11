import { PatientType } from "@/database/modals/PatientModel";
import Sidebar from "@/components/sidebar";
import { getUserDetails } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PatientTable } from "@/components/data-table";
import Stats from "@/components/stats";
import {getAllUsers as getDoctors} from '@/app/dashboard/doctor/page'

export const getAllUsers = async () => {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, {
      // cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: `auth_token=${authToken};`,
      },
    });
    const data = (await res.json()) as PatientType[];
    return data;
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
};
export default async function Dashboard() {
  const user = await getUserDetails();
  if (!user) return redirect("/auth/admin");

  const data = await getAllUsers();
  const totalPatient=data.length
  const inPatient=data.filter((item,index)=>item.patientType==='inpatient')
  const doctor=await getDoctors()
  // console.log(data);
  return (
    <div className="px-2">
      <Stats totalPatient={totalPatient} inPatient={inPatient.length} doctor={doctor.length} />
      <PatientTable users={data} />
    </div>
  );
}
