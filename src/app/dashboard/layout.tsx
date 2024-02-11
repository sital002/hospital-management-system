import Sidebar from "@/components/sidebar";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  return (
    <div className="flex gap-3 ">
      <Sidebar role={user?.role} />
      <main className="w-full">{children}</main>
    </div>
  );
}
