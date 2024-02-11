"use client";
import { LabtestType } from "@/database/modals/Labtest";
import { PrintComponent } from "./PrintComponent";

interface MainComponentProps {
  labtest: LabtestType;
}
export default function MainComponent({ labtest }: MainComponentProps) {
  return (
    <div>
      <PrintComponent labtest={labtest} />
    </div>
  );
}
