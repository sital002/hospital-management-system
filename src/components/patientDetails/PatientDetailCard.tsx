import React from "react";
import { PatientType } from "@/database/modals/PatientModel";

const PatientDetailCard = ({ patient }: { patient: PatientType }) => {
  return (
    <div className="w-full max-w-[570px] overflow-hidden rounded-lg bg-neutral-50 shadow-md">
      <div className="p-4">
        <h2 className="mb-6 text-lg font-bold text-gray-800">
          {patient.name} Profile
        </h2>
        {/* <Image alt="person-image" height={80} width={80} src="" className="h-20 rounded-full mx-auto mb-4"/> */}
        <div className="flex flex-col gap-10 p-6 text-gray-700">
          <p>
            <span className="mr-16 font-bold">Full Name:</span> {patient.name}
          </p>
          <p>
            <span className="mr-16 font-bold">Mobile:</span> {patient.phone}
          </p>
          <p>
            <span className="mr-16 font-bold">Address:</span>
            {patient.address}
          </p>
          <p>
            <span className="mr-16 font-bold">Date Of Birth:</span>
            {patient.dob}
          </p>
          <p>
            <span className="mr-16 font-bold">Patient Type:</span>
            {patient.patientType}
          </p>
          <p>
            <span className="mr-16 font-bold">Admit Type:</span>
            {patient.admitType}
          </p>
          {/* <p><span className="font-bold mr-16">Data Recorded:</span>{patient.updatedAt}</p> */}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailCard;
