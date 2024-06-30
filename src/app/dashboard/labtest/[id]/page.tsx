import connectToDB from "@/database/connectToDB";
import { Labtest, LabtestType } from "@/database/modals/Labtest";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import MainComponent from "./_components/MainComponent";

async function getLabtest(labtestId: string) {
  "use server";
  try {
    const data = await Labtest.findById(labtestId).populate("patient");
    console.log("THe data", data);
    return JSON.parse(JSON.stringify(data));
  } catch (err: any) {
    // console.log(err.message);
    return {};
  }
}
export default async function page({ params }: { params: { id: string } }) {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  const labtest = (await getLabtest(params.id)) as LabtestType;
  // console.log("this is the labtest", labtest);
  if (!labtest) return <h1>No test to display </h1>;
  console.log(labtest.patient, "THe patient is");
  // return <PatientForm />;
  return <MainComponent labtest={labtest} />;
}
