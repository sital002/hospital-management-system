import React from "react"
import { StaffType } from "@/database/modals/StaffModal"
import { formatDate } from "@/utils/formatDate"
import Image from "next/image"

const StaffDetailCard = ({staff}:{staff:StaffType}) => {
  console.log(staff)
  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow-md max-w-[570px] w-full">
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">{staff.name} Profile</h2>
      <Image alt="person-image" height={80} width={80} src="https://th.bing.com/th/id/OIP.EYHt8f5tqkTU5l6szP5XbQHaE8?rs=1&pid=ImgDetMain" className="h-20 rounded-full mx-auto mb-4"/>

      <div className="text-gray-700 flex flex-col gap-10 p-6">
        <p><span className="font-bold mr-16">Full Name:</span> {staff.name}</p>
        <p><span className="font-bold mr-16">Mobile:</span> {staff.phone}</p>
        <p><span className="font-bold mr-16">Address:</span>{staff.address}</p>
        <p><span className="font-bold mr-16">Shift:</span>{staff.shift}</p>
        <p><span className="font-bold mr-16">Email:</span>{staff.email}</p>
        {/* <p><span className="font-bold mr-16">Date Of Birth:</span>{formatDate(staff.dob)}</p> */}
        {/* <p><span className="font-bold mr-16">Data Recorded:</span>{staff.updatedAt}</p> */}
      </div>
    </div>
  </div>
  )
}

export default StaffDetailCard