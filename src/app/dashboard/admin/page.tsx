import Maindashboard from "@/components/MainDashboard";
import { PatientType } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
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
    // console.log(data);
    return data;
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
};
export default async function Dashboard() {
  // const isAuthencated = isAuthenticated();
  // if (!isAuthencated) return redirect("/signin");
  const user = await getUserDetails();
  if (!user) return redirect("/signin");

  const data = await getAllUsers();
  console.log(data);
  // console.log(data);
  return (
    <div>
      <Maindashboard users={data} />
    </div>
  );
}
