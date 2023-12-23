"use client";
import { MdDashboard } from "react-icons/md";
import "@/components/CSS/style.css";
import { useState } from "react";
import {
  Accessibility,
  BookOpenCheck,
  CircleUser,
  LayoutDashboard,
  Pill,
  UserRound,
  FlaskConical,
  ChevronRight,
  PlusSquare,
  FolderKanban,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface Option {
  name: string;
  url?: string;
  icon: React.ReactNode;
  dropdown?: Option[];
}

const sideBarOptions = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
    roles: [""],
  },
  {
    name: "Patient",
    icon: <Accessibility />,
    dropdown: [
      {
        name: "Register Patient",
        url: "/dashboard/patient/new",
        icon: <PlusSquare />,
      },
      {
        name: "View Patient",
        url: "/dashboard/patient",
        icon: <Eye />,
      },
      {
        name: "Manage Patient",
        url: "/dashboard/patient",
        icon: <FolderKanban />,
      },
    ],
  },
  {
    name: "Staff",
    icon: <UserRound />,
    dropdown: [
      {
        name: "Register Staff",
        url: "/dashboard/staff/new",
        icon: <PlusSquare />,
      },
      {
        name: "View Staff",
        url: "/dashboard/staff",
        icon: <Eye />,
      },
      {
        name: "Manage Staff",
        url: "/dashboard/staff",
        icon: <FolderKanban />,
      },
    ],
  },
  {
    name: "Doctor",
    icon: <CircleUser />,
    dropdown: [
      {
        name: "Register Doctor",
        url: "/dashboard/doctor/new",
        icon: <PlusSquare />,
      },
      {
        name: "View Doctor",
        url: "/da shboard/doctor",
        icon: <Eye />,
      },
      {
        name: "Manage Doctor",
        url: "/da shboard/doctor",
        icon: <FolderKanban />,
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon: <FolderKanban />,
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon: <FolderKanban />,
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon: <FolderKanban />,
      },
    ],
  },
  {
    name: "Lab Technician",
    url: "/dashboard/labtechnician",
    icon: <FlaskConical />,
  },
  {
    name: "Pharmacy",
    url: "/dashboard/pharmacy",
    icon: <Pill />,
  },
  {
    name: "Medical Report",
    icon: <BookOpenCheck />,
    dropdown: [
      {
        name: "Add Lab Report",
        url: "demo",
        icon: <PlusSquare />,
      },
      {
        name: "View Lab Report",
        url: "demo",
        icon: <Eye />,
      },
      {
        name: "Manage Lab Report",
        url: "demo",
        icon: <FolderKanban />,
      },
    ],
  },
];
export default function Sidebar() {
  interface Option {
    name: string;
    url?: string;
    icon: React.ReactNode;
    dropdown?: Option[];
  }

  interface DropdownState {
    patient: boolean;
    staff: boolean;
    doctor: boolean;
    labreport: boolean;
  }

  interface SidebarProps {
    sideBarOptions: Option[];
  }

  const [dropdown, setDropdown] = useState<DropdownState>({
    patient: false,
    staff: false,
    doctor: false,
    labreport: false,
  });

  interface SidebarProps {
    sideBarOptions: Option[];
  }

  const dropDownHandler = (name: keyof DropdownState) => {
    console.log(name);
    setDropdown((prv) => ({
      ...prv,
      [name]: !prv[name],
    }));
  };

  return (
    <div className="sticky left-0 top-0 h-[800px] w-[20vw] overflow-y-scroll border-r-2 border-gray-300 bg-[#fafbfb] ">
      <ul className="my-5 min-h-[85vh] border-t-2 border-gray-200  ">
        {sideBarOptions.map((option, index) => {
          const name = option.name.toLowerCase().trim();
          return (
            <Link
              className="transition-all duration-300"
              href={option.url || ""}
              key={option.name + index}
            >
              <li
                onClick={
                  option.dropdown &&
                  (() => dropDownHandler(name as keyof DropdownState))
                }
                className="relative  mx-2 flex items-center gap-2 px-1 py-2 hover:bg-gray-200 sm:px-3"
              >
                <div className="text-2xl">{option.icon}</div>
                <span className=" hidden sm:block">{option.name}</span>
                <hr />
                {option.dropdown && (
                  <ChevronRight
                    className={`absolute left-[90%] duration-300 ${
                      dropdown[name as keyof DropdownState] ? "rotate-90" : ""
                    }`}
                  />
                )}
              </li>
              {option.dropdown && (
                <ul
                  className={`h-0 w-full overflow-hidden px-1 transition-all duration-300 ${
                    dropdown[name as keyof DropdownState] ? "h-[180px]" : ""
                  }`}
                >
                  {option.dropdown.map((element, index) => {
                    return (
                      <Link
                        key={element.name + index}
                        href={element.url}
                        className="flex w-full gap-2 px-1 py-2 hover:bg-gray-500"
                      >
                        <p>{element.icon}</p>
                        <span>{element.name}</span>
                        <hr />
                      </Link>
                    );
                  })}
                </ul>
              )}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
