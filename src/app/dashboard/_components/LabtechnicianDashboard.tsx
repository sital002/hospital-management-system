import { PatientTable } from "@/components/data-table";
import React from "react";
import Stats from "@/components/stats";
import { PatientType } from "@/database/modals/PatientModel";

interface LabtechnicianDashboardProps {
  labtechnicianId: string;
  data: PatientType[];
}
export function LabtechnicianDashboard({
  labtechnicianId,
  data,
}: LabtechnicianDashboardProps) {
  return (
    <div>
      <Stats />
      <PatientTable users={data} showEdit={false} shwoDelete={false} />
    </div>
  );
}
