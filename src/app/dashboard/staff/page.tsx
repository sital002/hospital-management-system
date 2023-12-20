import Sidebar from "@/components/sidebar";
import StaffDashboard from "@/components/staff/StaffDashboard";
import { PatientType } from "@/database/modals/PatientModel";
import { Staff } from "@/database/modals/StaffModal";
import { getUserDetails } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getAllUsers = async () => {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: `auth_token=${authToken};`,
      },
    });
    const data = (await res.json()) as Staff[];
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
  console.log(data);
  return (
    <div className="flex items-start justify-around bg-[#fafbfb]">
      <StaffDashboard users={data} user={user} />
    </div>
  );
}
