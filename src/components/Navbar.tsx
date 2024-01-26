import { getUserDetails } from "@/utils/Auth";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { DarkModeToggle } from "./common/dark-mode-toggle";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
export default async function Navbar() {
  const user = await getUserDetails();
  const handleLogout = async () => {
    "use server";
    cookies().set("auth_token", "", {
      expires: new Date(0),
    });
  };
  // console.log("The user is ", user);
  return (
    <nav className=" relative w-full bg-[#092635] p-2  ">
      <div className="relative flex items-center justify-between px-3 py-3">
        <div className="flex cursor-pointer items-center  gap-2 pt-4 text-xl font-semibold text-white">
          <MdDashboard />
          <span>Hospital MS</span>
        </div>
        <div>
          {user ? (
            <div className=" flex cursor-pointer gap-3">
              <Image
                src=""
                className=" rounded-full border-2 border-white p-[1px]"
                alt="profile-image"
                height={50}
                width={50}
              />
              <div className="text-white">
                <p className="text-lg">{user.data?.name}</p>
                <p className="text-sm capitalize">{user?.role}</p>
              </div>
              <DarkModeToggle />
              <form action={handleLogout}>
                <Button type="submit">Logout</Button>
              </form>
            </div>
          ) : (
            <div>
              <Link
                href="/auth/admin"
                className="rounded-lg bg-[#00bfa6] px-4 py-2 text-white"
              >
                Sign In
              </Link>
              <DarkModeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
