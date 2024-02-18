"use client";
import "@/components/CSS/style.css";
import { Fragment, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarOptionType } from "@/app/dashboard/_utils/SidebarOptions";

interface SidebarProps {
  sideBarOptions: SidebarOptionType[];
  role: string | undefined;
}
export function Sidebar({ role, sideBarOptions }: SidebarProps) {
  interface DropdownState {
    patient: boolean;
    staff: boolean;
    doctor: boolean;
    labtest: boolean;
    labtechnician: boolean;
  }

  const [dropdown, setDropdown] = useState<DropdownState>({
    patient: false,
    staff: false,
    doctor: false,
    labtest: false,
    labtechnician: false,
  });

  const dropDownHandler = (name: keyof DropdownState) => {
    setDropdown((prv) => ({
      patient: name === "patient" ? !prv.patient : false,
      staff: name === "staff" ? !prv.staff : false,
      doctor: name === "doctor" ? !prv.doctor : false,
      labtest: name === "labtest" ? !prv.labtest : false,
      labtechnician: name === "labtechnician" ? !prv.labtechnician : false,
    }));
  };

  const router = usePathname();

  return (
    <div className="scrollbar-width-2 sticky left-0 top-0 max-h-[88vh] w-[23vw]  overflow-y-scroll">
      <ul className="my-5  border-t-2 border-gray-200  ">
        {sideBarOptions.map((option, index) => {
          const name = option.name.toLowerCase().trim();
          return (
            <Fragment key={option.name + index}>
              {(option?.roles === undefined ||
                option?.roles?.includes(role || "")) && (
                <li
                  className={`relative rounded-none hover:text-primary${
                    router === option?.url ? "text-primary" : ""
                  } `}
                  onClick={
                    option.dropdown &&
                    (() => dropDownHandler(name as keyof DropdownState))
                  }
                >
                  <Link
                    className={`${
                      router === option?.url ? "text-primary" : ""
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
                  className={`h-0  overflow-scroll  pl-5 text-center transition-all  ${
                    dropdown[name as keyof DropdownState] ? "h-fit  " : ""
                  }`}
                >
                  {option.dropdown.map((element, index) => {
                    return (
                      <Link
                        className={`flex gap-3  ${
                          router === element.url ? "text-primary" : ""
                        } `}
                        href={element.url || ""}
                        key={element.name + index}
                      >
                        <li
                          className={`w-full rounded-none hover:text-primary ${
                            router === element.url ? "text-primary" : ""
                          }`}
                        >
                          <span>{element.icon}</span>
                          <span>{element.name}</span>
                          <hr />
                        </li>
                      </Link>
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
