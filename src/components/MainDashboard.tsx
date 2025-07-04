"use client";
import { useState } from "react";
import Button from "./common/Button";
import AddProfileModal from "./AddProfileModal";
import { PatientType } from "@/database/modals/PatientModel";

interface AdminDashboardProps {
  users: PatientType[];
}
export default function MainDashboard({ users }: AdminDashboardProps) {
  const [showModal, setShowModal] = useState(false);

  function clickBtn() {
    setShowModal(!showModal);
  }

  return (
    <div>
      {showModal && (
        <AddProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <table className="mt-3 w-[77vw] border-collapse border-2 border-gray-200 text-center  ">
        <tbody>
          <tr className="py-2">
            <td className="py-3 font-semibold uppercase">Name</td>
            <td className="py-3 font-semibold uppercase">Address</td>
            <td className="py-3 font-semibold uppercase">Patient Type</td>

            {/* <td className="py-3 font-semibold uppercase">Email</td> */}
            <td className="py-3 font-semibold uppercase">DOB</td>
            <td className="py-3 font-semibold uppercase">Gender</td>
            {/* <td className="py-3 font-semibold uppercase">Role</td> */}
          </tr>

          {users.map((item, index) => (
            <tr className="h-[60px] border-2 border-gray-200" key={index}>
              <td className="uppercase">{item.name}</td>
              <td className="uppercase">{item?.address}</td>
              <td className="uppercase">{item?.patientType}</td>
              {/* <td>{item?.email}</td> */}
              <td className="uppercase">{item?.dob}</td>
              <td className="uppercase">{item?.gender}</td>
              {/* <td className="uppercase">{item.role}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
