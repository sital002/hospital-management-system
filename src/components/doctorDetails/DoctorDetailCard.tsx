import React from "react"
import { formatDate } from "@/utils/formatDate"
import { DoctorType } from "@/database/modals/DoctorModel"
import Image from "next/image"

const DoctorDetailCard = ({doctor}:{doctor:DoctorType}) => {

  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md max-w-[570px] w-full">
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">{doctor.name} Profile</h2>
      <Image alt="person-image" src="https://th.bing.com/th/id/OIP.EYHt8f5tqkTU5l6szP5XbQHaE8?rs=1&pid=ImgDetMain" className="w-20 h-20 rounded-full mx-auto mb-4"/>
      <div className="text-gray-700 flex flex-col gap-10 p-6">
        <p><span className="font-bold mr-16">Full Name:</span> {doctor.name}</p>
        <p><span className="font-bold mr-16">Mobile:</span> {doctor.phone}</p>
        <p><span className="font-bold mr-16">Address:</span>{doctor.address}</p>
        <p><span className="font-bold mr-16">Email:</span>{doctor.email}</p>
        <p><span className="font-bold mr-16">Department:</span>{doctor.department}</p>
        <p><span className="font-bold mr-16">Date Of Birth:</span>{formatDate(doctor.dob)}</p>
        {/* <p><span className="font-bold mr-16">Data Recorded:</span>{staff.updatedAt}</p> */}
      </div>
    </div>
  </div>
  )
}

export default DoctorDetailCard