import PatientDetailCard from "@/components/patientDetails/PatientDetailCard";
import PatientReportDetails from "@/components/patientDetails/table/VitalsTable";
import { PatientType } from "@/database/modals/PatientModel";

async function getPatientDetail(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${id}`,
    );
    const data = (await res.json()) as PatientType;
    console.log("The data is: ", data);
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const patient = await getPatientDetail(params.id);
  if (!patient) return null;
  return (
    <>
    <h1 className="ml-16 text-xl font-semibold">{`${patient.name}'s Profile`}</h1>
    <div className="flex  gap-4 ">
    <PatientDetailCard patient={patient}/>
    <PatientReportDetails/>
    </div>
    </>
  );
}
