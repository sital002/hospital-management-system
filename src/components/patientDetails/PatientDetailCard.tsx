import React from 'react'

const PatientDetailCard = ({patient}) => {
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
          <p  className="text-gray-800 text-lg">{patient.age}</p>
        </div>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Gender</label>
          <p className="text-gray-800 text-lg">{patient.gender}</p>
        </div>

        <div className="mb-4">
          <label  className="block text-gray-600 text-sm  mb-2">Date of Birth</label>
          <p  className="text-gray-800 text-lg">{patient.dob}</p>
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