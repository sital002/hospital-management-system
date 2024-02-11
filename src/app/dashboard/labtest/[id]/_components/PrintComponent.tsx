"use client";
import { LabtestType } from "@/database/modals/Labtest";
import { PrintPreview } from "../../new/_components/PrintPreview";
import { PatientCard } from "../../new/_components/PatientCard";
import { HospitalDetail } from "@/components/Labtests/HospitalDetail";
import ReactToPrint from "react-to-print";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";

interface PrintComponentProps {
  labtest: LabtestType;
}
export const PrintComponent = ({ labtest }: PrintComponentProps) => {
  const componentRef = useRef(null);

  const reactToPrintTrigger = useCallback(() => {
    return (
      <Button variant={"default"} className="w-full">
        Print
      </Button>
    );
  }, []);
  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, []);
  return (
    <div className="px-2">
      <div ref={componentRef} className="my-3">
        <HospitalDetail />
        <PatientCard patient={labtest.patient} />
        <PrintPreview tests={labtest.test} />
      </div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="Hospital Management System"
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
    </div>
  );
};
