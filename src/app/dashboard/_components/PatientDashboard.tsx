import { PatientView } from "@/components/patient/PatientView";
import React from "react";
import connectToDB from "@/database/connectToDB";
import { Labtest, LabtestType } from "@/database/modals/Labtest";
import { getPatientDetail } from "@/utils/getPatientDetail";

interface PatientDashboardProps {
  patientId: string;
}

async function getLabtests(patientId: string) {
  try {
    await connectToDB();
    const data = (await Labtest.find({ patient: patientId }).populate(
      "patient",
    )) as LabtestType[];
    return data ?? [];
  } catch (err: any) {
    console.log(err.message);
    return [];
  }
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
