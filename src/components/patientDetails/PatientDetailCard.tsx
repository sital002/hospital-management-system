import React from 'react'
import { PatientType } from '@/database/modals/PatientModel'

const PatientDetailCard = ({patient}:{patient:PatientType}) => {
  return (
    <div className=" m-10">
      <div className="min-w-[500px] w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Name</label>
          <p  className="text-gray-800 text-lg">{patient.name}</p>
        </div>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Age</label>
          <p  className="text-gray-800 text-lg">45 Years</p>
        </div>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Gender</label>
          <p className="text-gray-800 text-lg">{patient.gender}</p>
        </div>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Date of Birth</label>
          <p  className="text-gray-800 text-lg">demo</p>
        </div>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Address</label>
          <p className="text-gray-800 text-lg">{patient.address}</p>
        </div>

      </div>
    </div>
  )
}

export default PatientDetailCard