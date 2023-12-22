
"use client"
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
  Eye
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
    roles:[""]
  },
  {
    name: "Patient",
    // url: "/dashboard/patient",
    icon: <Accessibility />,
    dropdown: [
      {
        name: "Register Patient",
        url: "demo",
        icon:<PlusSquare />
      },
      {
        name: "View Patient",
        url: "demo",
        icon:<Eye />
      },
      {
        name: "Manage Patient",
        url: "demo",
        icon:<FolderKanban />
      },
    ],
  },
  {
    name: "Staff",
    // url: "/dashboard/staff",
    icon: <UserRound />,
    dropdown: [
      {
        name: "Register Staff",
        url: "demo",
        icon:<PlusSquare />
      },
      {
        name: "View Staff",
        url: "demo",
        icon:<Eye />
      },
      {
        name: "Manage Staff",
        url: "demo",
        icon:<FolderKanban />
      },
    ],
  },
  {
    name: "Doctor",
    // url: "/dashboard/doctor",
    icon: <CircleUser />,
    dropdown: [
      {
        name: "Register Doctor",
        url: "/dashboard/docor/new",
        icon:<PlusSquare />
      },
      {
        name: "View Doctor",
        url: "demo",
        icon:<Eye />
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon:<FolderKanban />
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon:<FolderKanban />
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon:<FolderKanban />
      },
      {
        name: "Manage Doctor",
        url: "demo",
        icon:<FolderKanban />
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
    // url: "/dashboard/medical-report",
    icon: <BookOpenCheck />,
    dropdown: [
      {
        name: "Add Lab Report",
        url: "demo",
        icon:<PlusSquare />
      },
      {
        name: "View Lab Report",
        url: "/demo",
        icon:<Eye />
      },
      {
        name: "Manage Lab Report",
        url: "demo",
        icon:<FolderKanban />
      },
    ],
  },
];
export default function Sidebar() {

  
  interface DropdownState {
    patient: boolean;
    staff: boolean;
    doctor: boolean;
    labreport: boolean;
  }
  
  interface SidebarProps {
    sideBarOptions: Option[];
  }
  

  const[dropdown,setDropdown]=useState<DropdownState>({
    patient:false,
    staff:false,
    doctor:false,
    labreport:false
  })

  interface SidebarProps {
    sideBarOptions: Option[];
  }

  const dropDownHandler=(name: keyof DropdownState)=>{
    console.log(name);
    setDropdown((prv)=>({
      ...prv,
      [name]:!prv[name]
    }))
  }

  return (
    <div className="sticky left-0 top-0 h-[800px] overflow-y-scroll w-[20vw] border-r-2 border-gray-300 bg-[#fafbfb] ">
      
      <ul className="my-5 min-h-[85vh] border-t-2 border-gray-200  ">
        {sideBarOptions.map((option, index) => {
          const name=option.name.toLowerCase().trim()
          return (
            <Link className="duration-300 transition-all" href={option?.url ? option.url : ""} key={option.name + index}>
              <li onClick={option.dropdown && (()=>dropDownHandler(name as keyof DropdownState))} className="mx-2  flex items-center gap-2 px-1 py-2 hover:bg-gray-200 sm:px-3 relative">
                <p className="text-2xl">{option.icon}</p>
                <span className=" hidden sm:block">{option.name}</span>
                <hr />
              {option.dropdown && <ChevronRight className={`absolute duration-300 left-[90%] ${dropdown[name as keyof DropdownState] ? "rotate-90":""}`} />}
              </li>
              {option.dropdown && (
                  <ul className={`w-full h-0 transition-all duration-300 overflow-hidden pl-10 pr-2 ${dropdown[name as keyof DropdownState] ? "min-h-[180px]":""}`}>
                    {option.dropdown.map((element, index) => {
                      return (
                        <Link  key={element.name + index} href={element.url}>
                          <li>
                            <p>{element.icon}</p>
                            <span>{element.name}</span>
                            <hr />
                          </li>
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
