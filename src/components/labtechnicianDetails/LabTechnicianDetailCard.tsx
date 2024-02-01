import React from "react"
import { formatDate } from "@/utils/formatDate"
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal"
import Image from "next/image"

const LabTechnicianDetailCard = ({labtechnician}:{labtechnician:LabtechnicianType}) => {
  console.log(labtechnician)
  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md max-w-[570px] w-full">
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">{labtechnician.name} Profile</h2>
      <Image alt="person-image" height={80} width={80} src="" className="h-20 rounded-full mx-auto mb-4"/>
      <div className="text-gray-700 flex flex-col gap-10 p-6">
        <p><span className="font-bold mr-16">Full Name:</span> {labtechnician.name}</p>
        <p><span className="font-bold mr-16">Mobile:</span> {labtechnician.phone}</p>
        <p><span className="font-bold mr-16">Address:</span>{labtechnician.address}</p>
        <p><span className="font-bold mr-16">Email:</span>{labtechnician.email}</p>
        {/* <p><span className="font-bold mr-16">Date Of Birth:</span>{formatDate(staff.dob)}</p> */}
        {/* <p><span className="font-bold mr-16">Data Recorded:</span>{staff.updatedAt}</p> */}
      </div>
    </div>
  </div>
  )
}

export default LabTechnicianDetailCard