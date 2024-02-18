import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { PatientLogin } from "./_components/PatientSign";
export default async function page() {
  const user = await getUserDetails();
  if (user) return redirect("/dashboard");
  return (
    <main className="flex items-center justify-center">
      <PatientLogin />
    </main>
  );
}
