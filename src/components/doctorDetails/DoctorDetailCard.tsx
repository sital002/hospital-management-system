import React from "react";
import { DoctorType } from "@/database/modals/DoctorModel";
import Image from "next/image";

const DoctorDetailCard = ({ doctor }: { doctor: DoctorType }) => {
  return (
    <div className="w-full max-w-[570px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
      <div className="p-4">
        <h2 className="mb-6 text-lg font-bold text-gray-800">
          {doctor.name} Profile
        </h2>
        <Image
          width={80}
          height={80}
          alt="person-image"
          src=""
          className="mx-auto mb-4 h-20 w-20 rounded-full"
        />
        <div className="flex flex-col gap-10 p-6 text-gray-700">
          <p>
            <span className="mr-16 font-bold">Full Name:</span> {doctor.name}
          </p>
          <p>
            <span className="mr-16 font-bold">Mobile:</span> {doctor.phone}
          </p>
          <p>
            <span className="mr-16 font-bold">Address:</span>
            {doctor.address}
          </p>
          <p>
            <span className="mr-16 font-bold">Email:</span>
            {doctor.email}
          </p>
          <p>
            <span className="mr-16 font-bold">Department:</span>
            {doctor.department}
          </p>
          <p>
            <span className="mr-16 font-bold">Date Of Birth:</span>
            {doctor.dob}
          </p>
          {/* <p><span className="font-bold mr-16">Data Recorded:</span>{staff.updatedAt}</p> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailCard;
