import { getUserDetails } from "@/utils/Auth";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { DarkModeToggle } from "./common/dark-mode-toggle";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import maleImage from "@/assets/undraw_male_avatar_g98d.svg";
import femaleImage from "@/assets/undraw_female_avatar_efig.svg";
export default async function Navbar() {
  const user = await getUserDetails();
  const handleLogout = async () => {
    "use server";
    cookies().set("auth_token", "", {
      expires: new Date(0),
    });
    redirect("/auth/admin");
  };
  // console.log("The user is ", user);
  let image;
  if (user) {
    image = user.data.gender === "male" ? maleImage : femaleImage;
  }
  return (
    <nav className=" relative w-full p-2  ">
      <div className="relative flex items-center justify-between px-3 py-3">
        <div className="flex cursor-pointer items-center  gap-2 pt-4 text-xl font-semibold ">
          <MdDashboard />
          <span className="text-black dark:text-white">Hospital MS</span>
        </div>
        <div>
          {user ? (
            <div className=" flex cursor-pointer gap-3">
              <Image
                src={image}
                className=" rounded-full border-2 border-white p-[1px]"
                alt="profile-image"
                height={50}
                width={50}
              />
              <div>
                <p className="text-lg">{user.data?.name}</p>
                <p className="text-sm capitalize">{user?.role}</p>
              </div>
              <form action={handleLogout}>
                <Button type="submit">Logout</Button>
              </form>
            </div>
          ) : (
            <div>
              <Link
                href="/auth/admin"
                className="rounded-lg bg-primary px-4 py-2 text-white "
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
