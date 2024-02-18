import React from "react";
import { StaffType } from "@/database/modals/StaffModal";
import Image from "next/image";

const StaffDetailCard = ({ staff }: { staff: StaffType }) => {
  console.log(staff);
  return (
    <div className="w-full max-w-[570px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
      <div className="p-4">
        <h2 className="mb-6 text-lg font-bold text-gray-800">
          {staff.name} Profile
        </h2>
        {/* <Image alt="person-image" height={80} width={80} src="https://th.bing.com/th/id/OIP.EYHt8f5tqkTU5l6szP5XbQHaE8?rs=1&pid=ImgDetMain" className="h-20 rounded-full mx-auto mb-4"/> */}

        <div className="flex flex-col gap-10 p-6 text-gray-700">
          <p>
            <span className="mr-16 font-bold">Full Name:</span> {staff.name}
          </p>
          <p>
            <span className="mr-16 font-bold">Mobile:</span> {staff.phone}
          </p>
          <p>
            <span className="mr-16 font-bold">Address:</span>
            {staff.address}
          </p>
          <p>
            <span className="mr-16 font-bold">Shift:</span>
            {staff.shift}
          </p>
          <p>
            <span className="mr-16 font-bold">Email:</span>
            {staff.email}
          </p>
          {/* <p><span className="font-bold mr-16">Date Of Birth:</span>{formatDate(staff.dob)}</p> */}
          {/* <p><span className="font-bold mr-16">Data Recorded:</span>{staff.updatedAt}</p> */}
        </div>
      </div>
    </div>
  );
};

export default StaffDetailCard;
