import { HospitalDetail } from "@/app/dashboard/labtest/new/_components/MainComponent";

import { PatientCard } from "@/app/dashboard/labtest/new/_components/PatientCard";
import { PrintPreview } from "@/app/dashboard/labtest/new/_components/PrintPreview";

export default function PrintComponent(props: any) {
  return (
    <div>
      <HospitalDetail />
      <PatientCard patient={props.labtest.patient} />
      <PrintPreview tests={props.labtest.test} />
    </div>
  );
}
