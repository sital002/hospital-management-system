import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";
import React from "react";
import male from "@/assets/undraw_male_avatar_g98d.svg";
import female from "@/assets/undraw_female_avatar_efig.svg";
import Image from "next/image";

type LabtechnicianDetailCardProps = {
  labtechnician: LabtechnicianType;
};
export function LabtechnicianDetailCard({
  labtechnician,
}: LabtechnicianDetailCardProps) {
  let image = labtechnician.gender === "male" ? male : female;
  return <div className="w-full mx-auto max-w-[500px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
  <div className="p-2">
    <h2 className=" text-center text-xl font-bold text-gray-800">
      {labtechnician.name} Profile
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
          <p>{labtechnician.name}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Mobile: </p>
          <p>{labtechnician.phone}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Address: </p>
          <p>{labtechnician.address}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Date Of Birth: </p>
          <p>{labtechnician.dob}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Gender: </p>
          <p>{labtechnician.gender}</p>
        </div>
        <div className="my-3 flex gap-6">
          <p className="font-bold">Email: </p>
          <p>{labtechnician.email}</p>
        </div>
      
      </div>
    </div>
  </div>
</div>
}
