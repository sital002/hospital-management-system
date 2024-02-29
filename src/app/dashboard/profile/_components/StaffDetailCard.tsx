import { StaffType } from "@/database/modals/StaffModal";
import React from "react";
import male from "@/assets/undraw_male_avatar_g98d.svg";
import female from "@/assets/undraw_female_avatar_efig.svg";
import Image from "next/image";

type StaffDetailCardProps = {
  staff: StaffType;
};
export function StaffDetailCard({ staff }: StaffDetailCardProps) {
  let image = staff.gender === "male" ? male : female;
  return <div className="w-full mx-auto max-w-[500px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
  <div className="p-2">
    <h2 className=" text-center text-xl font-bold text-gray-800">
      {staff.name} Profile
    </h2>

    <div className="flex  flex-col gap-4 p-6 text-gray-700">
      <Image
        src={image}
        className=" mx-auto rounded-full border-2 border-white p-[1px]"
        alt="profile-image"
        height={150}
        width={150}
      />
      <div className="mx-auto text-xl">
        <div className="flex gap-6">
          <p className="font-bold">Full Name: </p>
          <p>{staff.name}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Mobile: </p>
          <p>{staff.phone}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Address: </p>
          <p>{staff.address}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Date Of Birth: </p>
          <p>{staff.dob}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Gender: </p>
          <p>{staff.gender}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Shift: </p>
          <p>{staff.shift}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Email: </p>
          <p>{staff.email}</p>
        </div>
      
      </div>
    </div>
  </div>
</div>;
}
