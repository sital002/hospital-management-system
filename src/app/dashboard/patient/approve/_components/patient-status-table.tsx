"use client";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { PatientTypePlus } from "@/database/modals/PatientModel";
=======
import { PatientType } from "@/database/modals/PatientModel";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
import {
  handlePatientApproveStatus,
  handlePatientRejectStatus,
} from "../_actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface PatientStatusTableProps {
<<<<<<< HEAD
  patients: PatientTypePlus[];
=======
  patients: PatientType[];
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
}

export function PatientStatusTable({ patients }: PatientStatusTableProps) {
  console.log(patients);
  const router = useRouter();
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
                    toast.success("Patient account approved");
                    router.refresh();
                  }}
                >
                  <Button>Approve</Button>
                </form>
                <form
                  action={() => {
                    handlePatientRejectStatus(patient._id.toString());
                    toast.error("Patient account rejected");
                    router.refresh();
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
