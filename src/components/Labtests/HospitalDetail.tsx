import { formatDate } from "@/utils/formatDate";

export function HospitalDetail() {
  return (
    <div className="my-5">
      <h1 className="text-center text-xl font-bold">
        Ratnanagar Medical College
      </h1>
      <p className="my-2 text-center font-medium">Ratnangar-3,Tandi,Chitwan</p>
      <p className="my-2 mr-4 text-end font-semibold">
        Date: {formatDate(new Date())}
      </p>
    </div>
  );
}
