import MedicalReportCard from "@/components/medicalreport/MedicalReportCard";
import { PatientType } from "@/database/modals/PatientModel";
import { cookies } from "next/headers";

async function getMedicalReport(id: string) {
  console.log("params is : ", id);
  const authToken = cookies().get("auth_token")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${id}`,
      {
        credentials: "include",
        headers: {
          Cookie: `auth_token=${authToken};`,
        },
      },
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
  const medicalReport = await getMedicalReport(params.id);
  console.log(medicalReport);
  if (!medicalReport) return null;
  return <MedicalReportCard report={medicalReport} />;
}
