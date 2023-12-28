import { getUserDetails } from "@/utils/Auth";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

export default async function Navbar() {
  const user = await getUserDetails();
  // console.log("The user is ", user);
  return (
    <nav className=" relative w-full bg-[#092635] p-2  ">
      <div className="relative flex items-center justify-between px-3 py-3">
        <div className="flex cursor-pointer items-center  gap-2 pt-4 text-xl font-semibold text-white">
          <MdDashboard />
          <span>Hospital MS</span>
        </div>

        {user ? (
          <div className=" flex cursor-pointer gap-3">
            <Image src="" className=" rounded-full border-2 border-white p-[1px]" alt="profile-image" height={50} width={50}/>
            {/* <Image
            width={80}
              className="h-[50px] w-[50px] rounded-full border-2 border-white p-[1px]"
              src="https://th.bing.com/th/id/OIP.IrUBHhdMo6wWLFueKNreRwHaHa?rs=1&pid=ImgDetMain"
              alt="person-image"
            /> */}
            <div className="text-white">
              <p className="text-lg">{user.data?.name}</p>
              <p className="text-sm capitalize">{user?.role}</p>
            </div>
          </div>
        ) : (
          <div>
            <Link
              href="/auth/admin"
              className="rounded-lg bg-[#00bfa6] px-4 py-2 text-white"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
