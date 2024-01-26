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
    roles: ["admin"],
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
    roles: ["admin", "staff"],
    dropdown: [
      {
        name: "Register Doctor",
        url: "/dashboard/doctor/new",
        icon: <PlusSquare />,
      },
      {
        name: "View Doctor",
        url: "/dashboard/doctor",
        icon: <Eye />,
      },
      {
        name: "Manage Doctor",
        url: "/dashboard/doctor",
        icon: <FolderKanban />,
      },
    ],
  },
  {
    name: "LabTechnician",
    icon: <Accessibility />,
    dropdown: [
      {
        name: "Register Lab Technician",
        url: "/dashboard/labtechnician/new",
        icon: <PlusSquare />,
      },
      {
        name: "View Lab Technician",
        url: "/dashboard/labtechnician",
        icon: <Eye />,
      },
      {
        name: "Manage Lab Technicaian",
        url: "/dashboard/labtechnician",
        icon: <FolderKanban />,
      },
    ],
  },
  {
    name: "Pharmacy",
    url: "/dashboard/pharmacy",
    icon: <Pill />,
  },
  {
    name: "Medical Report",
    url: "/dashboard/medicalreport",
    icon: <BookOpenCheck />,
    roles: ["admin", "labtechnician", "doctor"],
  },
];
export default function Sidebar({ role }: { role: string | undefined }) {
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
    labtechnician: boolean;
  }

  interface SidebarProps {
    sideBarOptions: Option[];
  }

  const [dropdown, setDropdown] = useState<DropdownState>({
    patient: false,
    staff: false,
    doctor: false,
    labreport: false,
    labtechnician: false,
  });

  const dropDownHandler = (name: keyof DropdownState) => {
    setDropdown((prv) => ({
      patient: name === "patient" ? !prv.patient : false,
      staff: name === "staff" ? !prv.staff : false,
      doctor: name === "doctor" ? !prv.doctor : false,
      labreport: name === "labreport" ? !prv.labreport : false,
      labtechnician: name === "labtechnician" ? !prv.labtechnician : false,
    }));
  };

  const router = usePathname();
  console.log(router);

  return (
    <div className="sticky left-0 top-0 h-[100vh] w-[20vw] ">
      <ul className="my-5 min-h-[85vh] border-t-2 border-gray-200  ">
        {sideBarOptions.map((option, index) => {
          const name = option.name.toLowerCase().trim();
          return (
            <Fragment key={option.name + index}>
              {(option?.roles === undefined ||
                option?.roles?.includes(role || "")) && (
                <li
                  className={`relative rounded-none hover:text-[#4d7e7e] ${
                    router === option?.url ? "text-[#4d7e7e]" : ""
                  } `}
                  onClick={
                    option.dropdown &&
                    (() => dropDownHandler(name as keyof DropdownState))
                  }
                >
                  <Link
                    className={`${
                      router === option?.url ? "text-[#4d7e7e]" : ""
                    }  flex w-full items-center gap-2 px-1 py-1  sm:px-3`}
                    href={option?.url || ""}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className=" hidden sm:block">{option.name}</span>
                    <hr />
                    {option.dropdown && (
                      <ChevronRight
                        className={`absolute left-[90%] duration-300 ${
                          dropdown[name as keyof DropdownState]
                            ? "rotate-90"
                            : ""
                        }`}
                      />
                    )}
                  </Link>
                </li>
              )}
              {option.dropdown && (
                <ul
                  className={`h-0 w-full overflow-hidden text-center transition-all duration-300 ${
                    dropdown[name as keyof DropdownState] ? "h-[180px]" : ""
                  }`}
                >
                  {option.dropdown.map((element, index) => {
                    return (
                      <li
                        className={`rounded-none hover:text-[#4d7e7e] ${
                          router === element.url ? "text-[#4d7e7e]" : ""
                        }`}
                        key={element.name + index}
                      >
                        <Link
                          className={`flex w-full gap-3  ${
                            router === element.url ? "text-[#4d7e7e]" : ""
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
