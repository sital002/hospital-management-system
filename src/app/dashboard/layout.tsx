import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 ">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
