"use client";

import { FC } from "react";
import { Accessibility, UserCheck, Users, X } from "lucide-react";
import Modal from "./common/Modal";
import Link from "next/link";
interface PopUpFormProps {
  setShowModal: (e: boolean) => void;
  showModal: boolean;
}

const AddProfileModal: FC<PopUpFormProps> = ({ setShowModal, showModal }) => {
  const profileOptions = [
    {
      name: "Patient",
      value: "patient",
      url: "/dashboard/patient/new",
      icon: <Accessibility />,
    },
    {
      name: "Doctor",
      value: "doctor",
      url: "/dashboard/doctor/new",
      icon: <UserCheck />,
    },
    {
      name: "Staff",
      url: "/dashboard/staff/new",
      value: "staff",
      icon: <Users />,
    },
    {
      name: "Lab technician",
      url: "/dashboard/labtechnician/new",
      value: "lab technician",
      icon: <Users />,
    },
    {
      name: "Admin",
      url: "/dashboard/admin/new",
      value: "admin",
      icon: <Users />,
    },
    {
      name: "Medical Report",
      url: "/dashboard/medical-report/new",
      value: "medical-report",
      icon: <Users />,
    },
  ];

  return (
    <>
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        // title="Choose a profile"
      >
        <div className="mt-4 grid grid-cols-2 grid-rows-2 items-center justify-center gap-2 text-xl">
          {profileOptions.map((profile, index) => (
            <Link href={profile.url} key={profile.name + index}>
              <div className="flex cursor-pointer flex-col items-center rounded-xl p-4 py-12 transition-all duration-300 hover:bg-gray-100">
                {profile.icon}
                <p>{profile.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default AddProfileModal;
