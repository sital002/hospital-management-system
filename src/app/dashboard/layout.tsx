import { Sidebar } from "@/components/sidebar";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import { currentSideBar } from "./_utils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  const SidebarOptions = currentSideBar[user.role];
  return (
    <div className="flex gap-3 ">
      <Sidebar role={user?.role} sideBarOptions={SidebarOptions} />
      <main className="w-full">{children}</main>
    </div>
  );
}
