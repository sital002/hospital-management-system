import PatientDetailCard from "@/components/patientDetails/PatientDetailCard";
import { Card } from "@/components/ui/card";
import { PatientType } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import { redirect } from "next/navigation";

async function getLabtests() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/labtest`, {
      credentials: "include",
    });
    const data = (await res.json()) as any[];
    console.log(data);
    return data;
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
    // console.log("The data is: ", data);
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserDetails();
  if (!user) redirect("/auth/admin");
  const patient = await getPatientDetail(params.id);
  if (!patient) return null;
  const labtests = await getLabtests();

  return (
    <>
      <div className="m-6 flex flex-col gap-10 rounded-lg  lg:flex-row ">
        <PatientDetailCard patient={patient} />
        <div className="w-full">
          <h3 className="mb-3 text-xl font-medium">Recent Tests</h3>
          <div className="h-[400px] w-full  overflow-y-scroll p-5 shadow-md">
            {labtests.map((labtest) => {
              return <LabtestCard key={labtest._id} labtest={labtest} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function LabtestCard({ labtest }: { labtest: any }) {
  console.log(labtest);
  return (
    <Card className="my-3 cursor-pointer px-2 py-3">
      <p>{labtest?.category ?? "Not available"}</p>
      <p>labtest:{labtest._id}</p>
    </Card>
  );
}
