"use client";
import { Button } from "@/components/ui/button";
import { PatientTypePlus } from "@/database/modals/PatientModel";
import {
  handlePatientApproveStatus,
  handlePatientRejectStatus,
} from "../_actions";

interface PatientStatusTableProps {
  patients: PatientTypePlus[];
}

export function PatientStatusTable({ patients }: PatientStatusTableProps) {
  console.log(patients);
  if (patients.length === 0) return <p>No patients to show</p>;
  return (
    <div>
      {patients.map((patient) => {
        return (
          <div key={patient._id.toString()}>
            <div className="flex items-center justify-between border-b p-3">
              <div>
                <p>{patient.name}</p>
                <p>{patient.status}</p>
              </div>
              <div className="flex gap-3">
                <form
                  action={() => {
                    handlePatientApproveStatus(patient._id.toString());
                  }}
                >
                  <Button>Approve</Button>
                </form>
                <form
                  action={() => {
                    handlePatientRejectStatus(patient._id.toString());
                  }}
                >
                  <Button variant={"destructive"} className="ml-3">
                    Reject
                  </Button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
