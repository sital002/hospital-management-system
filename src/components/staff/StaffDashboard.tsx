"use client";
import { useState } from "react";
import { UserType } from "@/database/modals/UserModel";
import { formatDate } from "@/utils/formatDate";
import { PatientType } from "@/database/modals/PatientModel";
import AddProfileModal from "../AddProfileModal";
import Button from "../common/Button";
import { Staff, StaffType } from "@/database/modals/StaffModal";

interface PatientDashboardProps {
  users: StaffType[];
}
export default function StaffDashboard({ users }: PatientDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  console.log("saroj: ", users);

  function clickBtn() {
    setShowModal(!showModal);
  }

  return (
    <div>
      {showModal && (
        <AddProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <Button onClick={clickBtn} className="ml-[86%] w-fit">
        + Add New
      </Button>
      <table className="mt-3 w-[77vw] border-collapse border-2 border-gray-200 text-center  ">
        <tbody>
          <tr className="py-2">
            <td className="py-3 font-semibold uppercase">Name</td>
            <td className="py-3 font-semibold uppercase">Address</td>
            <td className="py-3 font-semibold uppercase">Shift</td>
            <td className="py-3 font-semibold uppercase">Gender</td>
            <td className="py-3 font-semibold uppercase">Action</td>
          </tr>

          {users.map((item, index) => (
            <tr className="h-[60px] border-2 border-gray-200" key={index}>
              <td className="uppercase">{item.name}</td>
              <td className="uppercase">{item?.address}</td>
              <td className="uppercase">{item?.shift}</td>
              <td className="uppercase">{item?.gender}</td>
              <td className="uppercase">
                <Button className="mr-3 w-fit">View</Button>
                <Button className="mr-3 w-fit">Edit</Button>
                <Button className="mr-3 w-fit">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
