import Button from "@/components/common/Button";
import PatientDetailCard from "@/components/patientDetails/PatientDetailCard";
import LabRecords from "@/components/patientDetails/table/LabRecords";
import PatientReportDetails from "@/components/patientDetails/table/VitalsTable";
import { PatientType } from "@/database/modals/PatientModel";

async function getPatientDetail(id: string) {
  console.log('params is : ',id)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${id}`,
      {
      credentials: "include",

      }

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
      <div className="m-6 flex flex-col gap-10 rounded-lg  lg:flex-row ">
        <PatientDetailCard patient={patient} />
        <div className="h-fit w-full max-w-[750px]  bg-neutral-50 p-5 shadow-md">
          <div className="flex gap-2">
            <Button>Prescription</Button>
            <Button>Vitals</Button>
            <Button>Lab Records</Button>
          </div>
          <LabRecords />
        </div>
      </div>
    </>
  );
}
