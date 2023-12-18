"use client";

import { FC, useState } from "react";
import { Accessibility, UserCheck, Users, X } from "lucide-react";

import DoctorForm from "./DoctorForm";
import LabTechnicianForm from "./LabTechnicianForm";
import StaffForm from "./StaffForm";
import PatientForm from "./PatientForm";
import Modal from "./common/Modal";
interface PopUpFormProps {
  setShowModal: (e: boolean) => void;
  showModal: boolean;
}

const AddProfileModal: FC<PopUpFormProps> = ({ setShowModal, showModal }) => {
  const [showForm, setShowForm] = useState("");
  const profileOptions = [
    {
      name: "Patient",
      value: "patient",
      component: <PatientForm setShowModal={setShowModal} />,
      icon: <Accessibility />,
    },
    {
      name: "Doctor",
      value: "doctor",
      component: <DoctorForm setShowModal={setShowModal} />,
      icon: <UserCheck />,
    },
    {
      name: "Staff",
      value: "staff",
      component: <StaffForm setShowModal={setShowModal} />,
      icon: <Users />,
    },
    {
      name: "Lab technician",
      value: "lab technician",
      component: <LabTechnicianForm setShowModal={setShowModal} />,
      icon: <Users />,
    },
  ];

  return (
    <>
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        title="Choose a profile"
      >
        {showForm !== "" && (
          <div>
            {profileOptions.find((e) => e.value === showForm)?.component}
          </div>
        )}

        {showForm === "" && (
          <div className="mt-4 grid grid-cols-2 grid-rows-2 items-center justify-center gap-2 text-xl">
            {profileOptions.map((profile, index) => (
              <button
                onClick={() => setShowForm(profile.value)}
                className="flex cursor-pointer flex-col items-center rounded-xl p-4 py-12 transition-all duration-300 hover:bg-gray-100"
                key={profile.name + index}
              >
                {profile.icon}
                <p>{profile.name}</p>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default AddProfileModal;
