import Link from "next/link";
import React from "react";
import Button from "./common/Button";
import { formatDate } from "@/utils/formatDate";

const MedicalReportTable = ({ users}:any) => {
  return (
    <table className="mt-3 w-[77vw] border-collapse border-2 border-gray-200 text-center  ">
      <thead className="py-2">
        <th className="py-3 font-semibold uppercase">Namess</th>
        <th className="py-3 font-semibold uppercase">Address</th>
        <th className="py-3 font-semibold uppercase">Patient Type</th>
        <th className="py-3 font-semibold uppercase">DOB</th>
        <th className="py-3 font-semibold uppercase">Gender</th>
        <th className="py-3 font-semibold uppercase">Action</th>
      </thead>

      <tbody>
        {users.map((item:any) => (
          <tr
            className="h-[60px] border-2 border-gray-200"
            key={item._id.toString()}
          >
            <td className="uppercase">{item.name}</td>
            <td className="uppercase">{item?.address}</td>
            <td className="uppercase">{item?.patientType}</td>
            <td className="uppercase">{formatDate(item?.dob)}</td>
            <td className="uppercase">{item?.gender}</td>
            <td className="uppercase">
              <Link href={`/dashboard/medicalreport/${item._id.toString()}`}>
                <Button className="mr-3 w-fit">Generate Medical Report</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicalReportTable;
