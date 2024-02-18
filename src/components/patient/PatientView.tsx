import React from "react";
import PatientDetailCard from "../patientDetails/PatientDetailCard";
import { LabtestType } from "@/database/modals/Labtest";
import { PatientType } from "@/database/modals/PatientModel";
import { formatDate } from "@/utils/formatDate";
import { Card } from "../ui/card";
import Link from "next/link";

type PatientViewProps = {
  patient: PatientType;
  labtests: LabtestType[];
};
export function PatientView({ patient, labtests }: PatientViewProps) {
  return (
    <div>
      {" "}
      <div className="m-6 flex flex-col gap-10 rounded-lg  lg:flex-row ">
        <PatientDetailCard patient={patient} />
        <div className="w-full">
          <h3 className="mb-3 text-xl font-medium">Recent Tests</h3>
          <div className="h-full w-full  overflow-y-scroll p-5 shadow-md">
            {labtests.length > 0 ? (
              labtests.map((labtest) => {
                return (
                  <LabtestCard key={labtest._id.toString()} labtest={labtest} />
                );
              })
            ) : (
              <h1>No labtest found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabtestCard({ labtest }: { labtest: LabtestType }) {
  console.log(labtest);
  return (
    <Link href={`/dashboard/labtest/${labtest._id.toString()}`}>
      <Card className="relative my-3 cursor-pointer px-2 py-3">
        <span className="absolute right-4 top-3">
          {formatDate(labtest.createdAt)}
        </span>
        <p className="font-medium">{labtest?.category ?? "Not available"}</p>
        <p>ID: {labtest._id.toString()}</p>
      </Card>
    </Link>
  );
}
