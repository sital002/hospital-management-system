import { PatientView } from "@/components/patient/PatientView";
import React from "react";
<<<<<<< HEAD
import { getLabtests, getPatientDetail } from "../patient/[id]/page";
=======
import connectToDB from "@/database/connectToDB";
import { Labtest, LabtestType } from "@/database/modals/Labtest";
import { getPatientDetail } from "@/utils/getPatientDetail";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

interface PatientDashboardProps {
  patientId: string;
}
<<<<<<< HEAD
=======

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
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
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
