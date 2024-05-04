import React from "react";
import Stats from "@/components/stats";
import { PatientType } from "@/database/modals/PatientModel";
import { PatientTable } from "@/components/data-table";
interface DoctorDashboardProps {
  doctorId: string;
  data: PatientType[];
}
export function DoctorDashboard({ doctorId, data }: DoctorDashboardProps) {
  return (
    <div>
      <Stats />
      <PatientTable users={data} showEdit={false} shwoDelete={false} />
    </div>
  );
}
