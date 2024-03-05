import { PatientType } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PatientTable } from "@/components/data-table";
import Stats from "@/components/stats";
import { PatientDashboard } from "./_components/PatientDashboard";

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

export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role === "patient" && user.data.status === "pending")
    return <p>Your account is pending for approval</p>;
  if (user.role === "patient" && user.data.status === "rejected")
    return <p>Your account is rejected</p>;
  const data = await getAllUsers();

  // console.log(data);

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
