// "use client";
import { LabtestType } from "@/database/modals/Labtest";
import { HospitalDetail } from "../new/_components/MainComponent";
import { PatientCard } from "../new/_components/PatientCard";
import { PrintPreview } from "../new/_components/PrintPreview";

interface PrintComponentProps {
  labtest: LabtestType;
}
export const PrintComponent = ({ labtest }: PrintComponentProps) => {
  return (
    <div>
      <div>
        <HospitalDetail />
        <PatientCard patient={labtest.patient} />
        <PrintPreview tests={labtest.test} />
      </div>
    </div>
  );
};
