
import StaffDetailCard from "@/components/staffDetails/StaffDetailCard";
import { StaffType } from "@/database/modals/StaffModal";

async function getstaffDetail(id: string) {
    console.log('params is : ',id)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/staff/${id}`,
    );
    const data = (await res.json()) as StaffType;
    console.log("The data is saroj: ", data);
    return data;
  } catch (err: any) {
    console.log('error is: ',err.message);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
   
  const staff = await getstaffDetail(params.id);
  console.log('k:',staff)
  if (!staff) return null;
  return (
    <>
      <div className="m-6 flex flex-col gap-10 rounded-lg  lg:flex-row ">
        <StaffDetailCard staff={staff} />
       
      </div>
    </>
  );
}
