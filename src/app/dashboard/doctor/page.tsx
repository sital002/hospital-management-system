import { PatientTable } from "@/components/data-table";
import { DoctorTable } from "@/components/doctor-data-table";
import Sidebar from "@/components/sidebar";
import { type DoctorType } from "@/database/modals/DoctorModel";
import { getUserDetails } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import  Stats  from "@/components/stats";
import {getAllUsers as getPatients} from '@/app/dashboard/patient/page'

export const getAllUsers = async () => {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor`, {
      // cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: `auth_token=${authToken};`,
      },
    });
    const data = (await res.json()) as DoctorType[];
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
  const patient=await getPatients()

  const totalPatient=patient.length
  const inPatient=patient.filter((item,index)=>item.patientType==='inpatient')
  console.log(data);
  return (
    <div className="">
      <Stats totalPatient={totalPatient} inPatient={inPatient.length} doctor={data.length} />
      <DoctorTable users={data} />
    </div>
  );
}
