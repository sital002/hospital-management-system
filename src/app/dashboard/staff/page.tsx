import { Staff, type StaffType } from "@/database/modals/StaffModal";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { StaffTable } from "@/components/staff-data-table";
import Stats from "@/components/stats";
import connectToDB from "@/database/connectToDB";

const getAllStaff = async () => {
  try {
    await connectToDB();
    const staff = await Staff.find();
    return staff ?? [];
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
};
export default async function Dashboard() {
  const user = await getUserDetails();
  if (!user) return redirect("/signin");
  if (user.role !== "admin")
    return <p>You arenot authorized to view this page</p>;

  const data = await getAllStaff();

  return (
    <div className="px-2">
      <Stats />
      <StaffTable users={JSON.stringify(data)} />
    </div>
  );
}
