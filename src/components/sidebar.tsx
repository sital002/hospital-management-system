import { MdDashboard } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import "@/components/CSS/style.css";
import {
  Accessibility,
  BookOpenCheck,
  CircleUser,
  LayoutDashboard,
  Pill,
  UserRound,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";

const sideBarOptions = [
  {
    name: "Dashboard",
    url: "/dashboard/admin",
    icon: <LayoutDashboard />,
  },
  {
    name: "Patient",
    url: "/patient",
    icon: <Accessibility />,
  },
  {
    name: "Staff",
    url: "/staff",
    icon: <UserRound />,
  },
  {
    name: "Doctor",
    url: "/doctor",
    icon: <CircleUser />,
  },
  {
    name: "Lab Technician",
    url: "labtechnician",
    icon: <FlaskConical />,
  },
  {
    name: "Pharmacy",
    url: "/pharmacy",
    icon: <Pill />,
  },
  {
    name: "Medical Report",
    url: "/medical-report",
    icon: <BookOpenCheck />,
  },
];
export default function Sidebar() {
  return (
    <div className="sticky left-0 top-0 h-[100vh] w-[20vw] border-r-2 border-gray-300 bg-[#fafbfb]">
      <div className="flex items-center gap-2 px-3 pt-4 text-xl font-semibold">
        <MdDashboard />
        <span>Hospital MS</span>
      </div>
      <ul className="my-5 min-h-[85vh] border-t-2 border-gray-200 ">
        {sideBarOptions.map((option, index) => {
          return (
            <Link href={option.url} key={option.name + index}>
              <li className="mx-2 flex items-center gap-2 px-1 py-2 hover:bg-gray-200 sm:px-3">
                <div className="text-2xl">{option.icon}</div>
                <span className=" hidden sm:block">{option.name}</span>
                <hr />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
