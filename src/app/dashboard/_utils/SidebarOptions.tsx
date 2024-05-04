import {
  Accessibility,
  CircleUser,
  FolderKanban,
  LayoutDashboard,
  Pill,
  PlusSquare,
  UserRound,
} from "lucide-react";
import React from 'react'

export interface SidebarOptionType {
  name: string;
  url?: string;
  icon: React.ReactNode;
  dropdown?: SidebarOptionType[];
  roles?: string[];
}

export const PaitentSidebarOptions: SidebarOptionType[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <PlusSquare size={20} />,
  },
  {
    name: "Update My Profile",
    url: "/dashboard/patient/update",
    icon: <PlusSquare size={20} />,
  },
  {
    name: "Book Appointment",
    url: "/dashboard/patient/appointment/new",
    icon: <PlusSquare size={20} />,
  },
  {
    name: "View Appointments",
    url: "/dashboard/patient/appointment",
    icon: <PlusSquare size={20} />,
  },
];
export const sideBarOptions: SidebarOptionType[] = [
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
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Patient",
        url: "/dashboard/patient",
        icon: <FolderKanban size={20} />,
      },
      {
        name: "Approve Profile",
        url: "/dashboard/patient/approve",
        icon: <FolderKanban size={20} />,
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
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Staff",
        url: "/dashboard/staff",
        icon: <FolderKanban size={20} />,
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
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Doctor",
        url: "/dashboard/doctor",
        icon: <FolderKanban size={20} />,
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
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Lab Technicaian",
        url: "/dashboard/labtechnician",
        icon: <FolderKanban size={20} />,
      },
    ],
  },
  {
    name: "Labtest",
    roles: ["admin", "labtechnician"],
    icon: <Pill />,
    dropdown: [
      {
        name: "Create LabTest",
        url: "/dashboard/labtest",
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage LabTest",
        url: "/dashboard/labtest/manage",
        icon: <FolderKanban size={20} />,
      },
    ],
  },
  {
    name: "Appointment",
    roles: ["admin", "staff"],
    icon: <PlusSquare size={20} />,
    url: "/dashboard/appointments",
  },
  {
    name: "View my Profile",
    url: "/dashboard/profile",
    icon: <CircleUser size={20} />,
  },
  {
    name: "update my Profile",
    url: "/dashboard/update",
    icon: <CircleUser size={20} />,
  },
];


export const staffSidebarOption:SidebarOptionType[]=[
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
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Patient",
        url: "/dashboard/patient",
        icon: <FolderKanban size={20} />,
      }
    ],
  },
  
  {
    name: "Doctor",
    icon: <CircleUser />,
    roles: ["staff"],
    dropdown: [
      {
        name: "Register Doctor",
        url: "/dashboard/doctor/new",
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Doctor",
        url: "/dashboard/doctor",
        icon: <FolderKanban size={20} />,
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
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage Lab Technicaian",
        url: "/dashboard/labtechnician",
        icon: <FolderKanban size={20} />,
      },
    ],
  },
  
    {
    name: "Appointment",
    roles: ["staff"],
    icon: <PlusSquare size={20} />,
    url: "/dashboard/appointments",
  },
  {
    name: "View my Profile",
    url: "/dashboard/profile",
    icon: <CircleUser size={20} />,
  },
  {
    name: "update my Profile",
    url: "/dashboard/update",
    icon: <CircleUser size={20} />,
  },
]

export const doctorSidebarOptions: SidebarOptionType[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <PlusSquare size={20} />,
  },
  {
    name: "View Appointments",
    url: "/dashboard/appointments",
    icon: <PlusSquare size={20} />,
  },

  {
    name: "Update My Profile",
    url: "/dashboard/update",
    icon: <PlusSquare size={20} />,
  },
];

export const labtechnicianSidebarOptions: SidebarOptionType[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <PlusSquare size={20} />,
  },

  {
    name: "Labtest",
    roles: ["admin", "labtechnician"],
    icon: <Pill />,
    dropdown: [
      {
        name: "Create LabTest",
        url: "/dashboard/labtest",
        icon: <PlusSquare size={20} />,
      },
      {
        name: "Manage LabTest",
        url: "/dashboard/labtest/manage",
        icon: <FolderKanban size={20} />,
      },
    ],
  },
  {
    name: "View my Profile",
    url: "/dashboard/profile",
    icon: <CircleUser size={20} />,
  },
  {
    name: "Update My Profile",
    url: "/dashboard/update",
    icon: <PlusSquare size={20} />,
  },
];
