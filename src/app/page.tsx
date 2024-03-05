import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  redirect("/dashboard");
}
