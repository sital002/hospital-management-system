import { PatientType } from "@/database/modals/PatientModel";

export function PatientCard({ patient }: { patient: PatientType }) {
  return (
    <div className="my-3 px-3 py-4 ">
      <div className="mx-auto grid w-fit grid-cols-3 gap-y-4 ">
        <h2>
          <span className="font-bold">Patient Name :</span> {patient.name}
        </h2>
        <h2>
          <span className="font-bold">Patient Address :</span> {patient.address}
        </h2>
        <h2 className="uppercase">
          <span className="font-bold">Patient Type :</span>{" "}
          {patient.patientType}
        </h2>
        <h2>
          <span className="font-bold">Date of birth :</span> {patient.dob}
        </h2>
        <h2 className="uppercase">
          <span className="font-bold">Admit Type :</span> {patient.admitType}
        </h2>
        <h2 className="uppercase">
          <span className="font-bold">Gender :</span> {patient.gender}
        </h2>
      </div>
    </div>
  );
}
