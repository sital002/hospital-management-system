import SignIn from "@/components/signin";
import { isAuthenticated } from "@/utils/Auth";
import { redirect } from "next/navigation";
export default function page() {
  const isAuthencated = isAuthenticated();
  if (isAuthencated) return redirect("/dashboard");
  return (
    <main className="flex items-center justify-center">
      <SignIn />
    </main>
  );
}
