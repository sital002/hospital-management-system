import { FC, useState } from "react";
import PatientForm from "../PatientForm";
import { PatientType } from "@/database/modals/PatientModel";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

interface EditLabtestModalProps {
  patient?: PatientType;
}
const EditPatientModal: FC<EditLabtestModalProps> = ({ patient }) => {
  console.log(patient);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="default">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-full">
            <PatientForm
              update={true}
              patient={patient}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPatientModal;
