"use client";
import { MdDashboard } from "react-icons/md";
import "@/components/CSS/style.css";
import { Fragment, useEffect, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    setDropdown((prv) => ({
      patient: name === "patient" ? !prv.patient : false,
      staff: name === "staff" ? !prv.staff : false,
      doctor: name === "doctor" ? !prv.doctor : false,
      labreport: name === "labreport" ? !prv.labreport : false,
    }));
  };

  const router = usePathname();
  console.log(router);

  return (
    <div className="sticky left-0 top-0 h-[100vh] w-[20vw] border-r-2 border-gray-300 bg-[#fafbfb]">
      <ul className="my-5 min-h-[85vh] border-t-2 border-gray-200  ">
        {sideBarOptions.map((option, index) => {
          const name = option.name.toLowerCase().trim();
          return (
            <Fragment key={option.name + index}>
              <li
                className={`relative hover:bg-[#75e9e6] ${
                  router === option?.url ? "bg-[#75e9e6]" : ""
                } `}
                onClick={
                  option.dropdown &&
                  (() => dropDownHandler(name as keyof DropdownState))
                }
              >
                <Link
                  className={`${
                    router === option?.url ? "bg-[#75e9e6]" : ""
                  }  flex w-full items-center gap-2 px-1 py-1  sm:px-3`}
                  href={option?.url || ""}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className=" hidden sm:block">{option.name}</span>
                  <hr />
                  {option.dropdown && (
                    <ChevronRight
                      className={`absolute left-[90%] duration-300 ${
                        dropdown[name as keyof DropdownState] ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </Link>
              </li>
              {option.dropdown && (
                <ul
                  className={`h-0 w-full overflow-hidden pl-10 pr-2 transition-all duration-300 ${
                    dropdown[name as keyof DropdownState] ? "h-[180px]" : ""
                  }`}
                >
                  {option.dropdown.map((element, index) => {
                    return (
                      <li
                        className={`hover:bg-[#75e9e6] ${
                          router === element.url ? "bg-[#75e9e6]" : ""
                        }`}
                        key={element.name + index}
                      >
                        <Link
                          className={`flex w-full gap-3  ${
                            router === element.url ? "bg-[#75e9e6]" : ""
                          } `}
                          href={element.url}
                        >
                          {element.icon}
                          <span>{element.name}</span>
                          <hr />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
