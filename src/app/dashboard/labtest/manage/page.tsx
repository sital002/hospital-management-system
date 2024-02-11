import { getUserDetails } from "@/utils/Auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LabtestTable } from "./_components/LabtestTable";
import { LabtestType } from "@/database/modals/Labtest";

export const getAllLabtest = async () => {
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/labtest`, {
      // cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: `auth_token=${authToken};`,
      },
    });
    const data = (await res.json()) as LabtestType[];
    return data;
  } catch (err: any) {
    console.log(err?.message);
    return [];
  }
};
export default async function page() {
  const user = await getUserDetails();
  if (!user) return redirect("/auth/admin");

  const data = await getAllLabtest();
  return (
    <div className="px-2">
      <LabtestTable labtests={data} />
    </div>
  );
}
