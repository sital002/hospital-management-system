import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { LoginComponent } from "./_components/LoginComponent";
export default async function page() {
  const user = await getUserDetails();
  if (user) return redirect("/dashboard");
  return (
    <main className="flex items-center justify-center">
      <LoginComponent />
    </main>
  );
}
