import React from 'react'

const VitalsTable = () => {
  return (
    <div className='min-w-[600px] p-5 border-gray-500 border-2 shadow-md h-fit'>
        <div className='flex  gap-7'>
            <button className='bg-green-500 p-3 rounded-md grow text-white'>Prescription</button>
            <button className='bg-green-500 p-3 rounded-md grow text-white'>Vitals</button>
            <button className='bg-green-500 p-3 rounded-md grow text-white'>Lab Records</button>
        </div>
        <table className='w-full text-center border-red-500 border-2 mt-6'>
            <thead>
                <th className='p-3 border-2 border-gray-500'>Body Tempereture</th>
                <th className='p-3 border-2 border-gray-500'>Heart Pulse</th>
                <th className='p-3 border-2 border-gray-500'>Blood Pressure</th>
                <th className='p-3 border-2 border-gray-500'>Date Recorded</th>
            </thead>
            <tbody>
                <tr >
                <td className='p-3 border-2 border-gray-500'>45 Deg</td>
                <td className='p-3 border-2 border-gray-500'>120/110</td>
                <td className='p-3 border-2 border-gray-500'>200/150</td>
                <td className='p-3 border-2 border-gray-500'>2003-2-1</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default VitalsTable