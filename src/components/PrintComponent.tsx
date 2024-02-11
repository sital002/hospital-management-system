import { PatientCard } from "@/app/dashboard/labtest/new/_components/PatientCard";
import { PrintPreview } from "@/app/dashboard/labtest/new/_components/PrintPreview";
import { HospitalDetail } from "./Labtests/HospitalDetail";

export default function PrintComponent(props: any) {
  return (
    <div>
      <HospitalDetail />
      <PatientCard patient={props.labtest.patient} />
      <PrintPreview tests={props.labtest.test} />
    </div>
  );
}
