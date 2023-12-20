import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";

async function getLabtechnicianDetail(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician/${id}`,
    );
    const data = (await res.json()) as LabtechnicianType;
    console.log("The data is: ", data);
    return data;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const labtechnician = await getLabtechnicianDetail(params.id);
  if (!labtechnician) return null;
  return (
    <div>
      <h1>{labtechnician.name}</h1>
      <p>{labtechnician.address}</p>
    </div>
  );
}
