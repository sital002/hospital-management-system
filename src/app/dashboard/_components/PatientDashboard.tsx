import { PatientView } from "@/components/patient/PatientView";
import React from "react";
import { getLabtests, getPatientDetail } from "../patient/[id]/page";

interface PatientDashboardProps {
  patientId: string;
}
export async function PatientDashboard({ patientId }: PatientDashboardProps) {
  // const user = await getUserDetails();
  // if (!user) redirect("/signin");
  const patient = await getPatientDetail(patientId);
  if (!patient) return null;

  const labtests = await getLabtests(patientId);

  return (
    <div>
      <PatientView labtests={labtests} patient={patient} />
    </div>
  );
}
