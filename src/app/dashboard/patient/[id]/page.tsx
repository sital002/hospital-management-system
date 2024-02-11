import PatientDetailCard from "@/components/patientDetails/PatientDetailCard";
import { Card } from "@/components/ui/card";
import connectToDB from "@/database/connectToDB";
import { Labtest } from "@/database/modals/Labtest";
import { PatientType } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getLabtests(patientId: string) {
  try {
    await connectToDB();
    const data = await Labtest.find({ patient: patientId }).populate("patient");
    return data ?? [];
  } catch (err: any) {
    console.log(err.message);
    return [];
  }
}
async function getPatientDetail(id: string) {
  // console.log("params is : ", id);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${id}`,
      {
        credentials: "include",
      },
    );
    const data = (await res.json()) as PatientType;
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserDetails();
  if (!user) redirect("/signin");
  const patient = await getPatientDetail(params.id);
  if (!patient) return null;
  const labtests = await getLabtests(params.id);

  return (
    <>
      <div className="m-6 flex flex-col gap-10 rounded-lg  lg:flex-row ">
        <PatientDetailCard patient={patient} />
        <div className="w-full">
          <h3 className="mb-3 text-xl font-medium">Recent Tests</h3>
          <div className="h-full w-full  overflow-y-scroll p-5 shadow-md">
            {labtests.length > 0 ? (
              labtests.map((labtest) => {
                return <LabtestCard key={labtest._id} labtest={labtest} />;
              })
            ) : (
              <h1>No labtest found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function LabtestCard({ labtest }: { labtest: any }) {
  console.log(labtest);
  return (
    <Link href={`/dashboard/labtest/${labtest._id.toString()}`}>
      <Card className="my-3 cursor-pointer px-2 py-3">
        <p>{labtest?.category ?? "Not available"}</p>
        <p>labtest:{labtest._id.toString()}</p>
        <hr />
      </Card>
    </Link>
  );
}
