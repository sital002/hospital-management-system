import React from "react";
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";
import Image from "next/image";

const LabTechnicianDetailCard = ({
  labtechnician,
}: {
  labtechnician: LabtechnicianType;
}) => {
  console.log(labtechnician);
  return (
    <div className="w-full max-w-[570px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
      <div className="p-4">
        <h2 className="mb-6 text-lg font-bold text-gray-800">
          {labtechnician.name} Profile
        </h2>
        <Image
          alt="person-image"
          height={80}
          width={80}
          src=""
          className="mx-auto mb-4 h-20 rounded-full"
        />
        <div className="flex flex-col gap-10 p-6 text-gray-700">
          <p>
            <span className="mr-16 font-bold">Full Name:</span>{" "}
            {labtechnician.name}
          </p>
          <p>
            <span className="mr-16 font-bold">Mobile:</span>{" "}
            {labtechnician.phone}
          </p>
          <p>
            <span className="mr-16 font-bold">Address:</span>
            {labtechnician.address}
          </p>
          <p>
            <span className="mr-16 font-bold">Email:</span>
            {labtechnician.email}
          </p>
          {/* <p><span className="font-bold mr-16">Date Of Birth:</span>{formatDate(staff.dob)}</p> */}
          {/* <p><span className="font-bold mr-16">Data Recorded:</span>{staff.updatedAt}</p> */}
        </div>
      </div>
    </div>
  );
};

export default LabTechnicianDetailCard;
