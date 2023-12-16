"use client";

import { FC, Fragment, useState } from "react";
import { Accessibility, UserCheck, Users, X } from "lucide-react";

import { Dialog, Transition } from "@headlessui/react";
import DoctorForm from "./DoctorForm";
import LabTechnicianForm from "./LabTechnicianForm";
import StaffForm from "./StaffForm";
import PatientForm from "./PatientForm";
interface PopUpFormProps {
  setShowModal: (e: boolean) => void;
  showModal: boolean;
}
const profileOptions = [
  {
    name: "Patient",
    value: "patient",
    component: <PatientForm />,
    icon: <Accessibility />,
  },
  {
    name: "Doctor",
    value: "doctor",
    component: <DoctorForm />,
    icon: <UserCheck />,
  },
  {
    name: "Staff",
    value: "staff",
    component: <StaffForm />,
    icon: <Users />,
  },
  {
    name: "Lab technician",
    value: "lab technician",
    component: <LabTechnicianForm />,
    icon: <Users />,
  },
];
const AddProfileModal: FC<PopUpFormProps> = ({ setShowModal, showModal }) => {
  const [showForm, setShowForm] = useState("");
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-[800px]  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {showForm === "" && (
                    <Dialog.Title
                      as="h3"
                      className="text-center text-xl font-medium leading-6 text-gray-900"
                    >
                      Choose a Profile
                    </Dialog.Title>
                  )}

                  {showForm !== "" && (
                    <div>
                      {
                        profileOptions.find((e) => e.value === showForm)
                          ?.component
                      }
                    </div>
                  )}

                  {showForm === "" && (
                    <div className="mt-4 grid grid-cols-2 grid-rows-2 items-center justify-center gap-2 text-xl">
                      {profileOptions.map((profile, index) => (
                        <div
                          onClick={() => setShowForm(profile.value)}
                          className="flex cursor-pointer flex-col items-center rounded-xl p-4 py-12 transition-all duration-300 hover:bg-gray-100"
                          key={profile.name + index}
                        >
                          {profile.icon}
                          <p>{profile.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddProfileModal;
