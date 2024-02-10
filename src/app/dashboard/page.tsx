import Maindashboard from "@/components/MainDashboard";
import { PatientType } from "@/database/modals/PatientModel";
import { getUserDetails, isAuthenticated } from "@/utils/Auth";
import  Stats  from "@/components/stats";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {getAllUsers as getDoctors} from '@/app/dashboard/doctor/page'
const getAllUsers = async () => {
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
  const doctor=await getDoctors()

  const totalPatient=data.length
  const inPatient=data.filter((item,index)=>item.patientType==='inpatient')
  return (
    <>
    <Stats totalPatient={totalPatient} inPatient={inPatient.length} doctor={doctor.length} />
      <Maindashboard users={data} />
    </>
  );
}
