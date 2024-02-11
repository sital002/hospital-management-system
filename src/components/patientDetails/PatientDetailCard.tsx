import React from "react";
import { PatientType } from "@/database/modals/PatientModel";
import male from "@/assets/undraw_male_avatar_g98d.svg";
import female from "@/assets/undraw_female_avatar_efig.svg";
import Image from "next/image";

const PatientDetailCard = ({ patient }: { patient: PatientType }) => {
  let image = patient.gender === "male" ? male : female;
  console.log(patient);
  return (
    <div className="w-full max-w-[500px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
      <div className="p-2">
        <h2 className=" text-xl text-center font-bold text-gray-800">
          {patient.name} Profile
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
            <div className="flex gap-3">
              <p className="font-bold">Full Name: </p>
              <p>{patient.name}</p>
            </div>
            <div className="flex gap-6 my-3">
              <p className="font-bold">Mobile: </p>
              <p>{patient.phone}</p>
            </div>
            <div className="flex gap-6 my-3">
              <p className="font-bold">Address: </p>
              <p>{patient.address}</p>
            </div>
            <div className="flex gap-6 my-3">
              <p className="font-bold">Date Of Birth: </p>
              <p>{patient.dob}</p>
            </div>
            <div className="flex gap-6 my-3">
              <p className="font-bold">Gender: </p>
              <p>{patient.gender}</p>
            </div>
            <div className="flex gap-6 my-3">
              <p className="font-bold">Patient Type: </p>
              <p>{patient.patientType}</p>
            </div>
            <div className="flex gap-6 my-3">
              <p className="font-bold">Admit Type: </p>
              <p>{patient.admitType}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailCard;
