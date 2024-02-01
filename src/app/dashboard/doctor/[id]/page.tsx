
import DoctorDetailCard from "@/components/doctorDetails/DoctorDetailCard";
import { DoctorType } from "@/database/modals/DoctorModel";

async function getdoctorDetail(id: string) {
    console.log('params is : ',id)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${id}`,
    );
    const data = (await res.json()) as DoctorType;
    console.log("The data is saroj: ", data);
    return data;
  } catch (err: any) {
    console.log('error is: ',err.message);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
   
  const doctor = await getdoctorDetail(params.id);
  console.log('k:',doctor)
  if (!doctor) return null;
  return (
    <>
      <div className="m-6 flex flex-col gap-10 rounded-lg  lg:flex-row ">
        <DoctorDetailCard doctor={doctor} />
       
      </div>
    </>
  );
}
