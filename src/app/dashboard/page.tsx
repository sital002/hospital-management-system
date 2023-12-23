import Maindashboard from "@/components/MainDashboard";
import { PatientType } from "@/database/modals/PatientModel";
import { getUserDetails, isAuthenticated } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAllUsers = async () => {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, {
      cache: "no-store",
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
  console.log(user);
  if (!user) return redirect("/auth/admin");

  const data = await getAllUsers();
  console.log(data);
  return (
    <div>
      <Maindashboard users={data} />
    </div>
  );
}
