import connectToDB from "@/database/connectToDB";
import { Labtest, LabtestType } from "@/database/modals/Labtest";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";
import MainComponent from "./_components/MainComponent";

async function getLabtest(labtestId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtest/${labtestId}`,
      {
        credentials: "include",
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as LabtestType;
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}
export default async function page({ params }: { params: { id: string } }) {
  const user = await getUserDetails();
  if (!user) redirect("/auth/admin");
  const labtest = (await getLabtest(params.id)) as LabtestType;
  // console.log("this is the labtest", labtest);
  if (!labtest) return <h1>NO test to display </h1>;
  console.log(labtest.patient);
  // return <PatientForm />;
  return <MainComponent labtest={labtest} />;
}
