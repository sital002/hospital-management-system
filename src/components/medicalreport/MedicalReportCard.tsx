"use client";

import React, { useRef } from "react";
import Button from "../common/Button";
import { useReactToPrint } from "react-to-print";
import "../CSS/style.css";

const MedicalReportCard = ({ report }:any) => {
  const reportView = useRef(null);

  const printReport = () =>
    useReactToPrint({
      content: () => reportView.current,
    });

  console.log("medicalReport: ", report);
  return (
    <div
      ref={reportView}
      className="mx-auto w-full max-w-[1000px] drop-shadow-lg overflow-hidden rounded-lg bg-neutral-50  p-3"
    >
      <div className="p-4">
        <div className="bg-[#092635] p-10 text-center text-white">
          <p className="p-3 text-xl">XYZ Hospital</p>
          <h2 className="text-3xl">{report.name} Medical Report</h2>
        </div>

        <div className="flex flex-col gap-10 p-6 text-gray-700">
          <p>
            <span className="mr-16 font-bold">Full Name:</span> {report.name}
          </p>
          <p>
            <span className="mr-16 font-bold">Mobile:</span> {report.phone}
          </p>
          <p>
            <span className="mr-16 font-bold">Address:</span>
            {report.address}
          </p>
          <p>
            <span className="mr-16 font-bold">Patient Type:</span>
            {report.patientType}
          </p>
          <p>
            <span className="mr-16 font-bold">Admit Type:</span>
            {report.admitType}
          </p>
          <p>
            <span className="mr-16 font-bold">Checked By:</span>Dr.Popatlal
          </p>
        </div>
      </div>
      <Button onClick={printReport} className=" left-full float-right w-fit">
        Print
      </Button>
    </div>
  );
};

export default MedicalReportCard;
