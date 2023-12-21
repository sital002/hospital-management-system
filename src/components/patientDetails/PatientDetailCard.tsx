import React from "react"
import { PatientType } from "@/database/modals/PatientModel"
import { formatDate } from "@/utils/formatDate"

const PatientDetailCard = ({patient}:{patient:PatientType}) => {
  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md max-w-[570px] w-full">
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">{patient.name} Profile</h2>
      <img src="https://th.bing.com/th/id/OIP.EYHt8f5tqkTU5l6szP5XbQHaE8?rs=1&pid=ImgDetMain" alt="" className="w-20 h-20 rounded-full mx-auto mb-4" />
      <div className="text-gray-700 flex flex-col gap-10 p-6">
        <p><span className="font-bold mr-16">Full Name:</span> {patient.name}</p>
        <p><span className="font-bold mr-16">Mobile:</span> {patient.phone}</p>
        <p><span className="font-bold mr-16">Address:</span>{patient.address}</p>
        <p><span className="font-bold mr-16">Date Of Birth:</span>{formatDate(patient.dob)}</p>
        <p><span className="font-bold mr-16">Patient Type:</span>{patient.patientType}</p>
        <p><span className="font-bold mr-16">Admit Type:</span>{patient.admitType}</p>
        {/* <p><span className="font-bold mr-16">Data Recorded:</span>{patient.updatedAt}</p> */}
      </div>
    </div>
  </div>
  )
}

export default PatientDetailCard