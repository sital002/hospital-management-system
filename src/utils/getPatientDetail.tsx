import connectToDB from "@/database/connectToDB";
import { Patient, PatientType } from "@/database/modals/PatientModel";

export async function getPatientDetail(id: string) {
  // console.log("params is : ", id);
  try {
    await connectToDB();
    const data = await Patient.findById(id);
    return data as PatientType;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}
