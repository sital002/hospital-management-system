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
    <div>
      <h1>{patient.name}</h1>
      <p>{patient.address}</p>
    </div>
  );
}
