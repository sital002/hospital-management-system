import { FC } from "react";
import Modal from "../common/Modal";
import PatientForm from "../PatientForm";
import { PatientType } from "@/database/modals/PatientModel";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

interface EditLabtestModalProps {
  setShow: (e: boolean) => void;
  show: boolean;
  patient?: PatientType;
}
const EditPatientModal: FC<EditLabtestModalProps> = ({
  setShow,
  patient,
  show,
}) => {
  console.log(patient);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <PatientForm
            show={show}
            setShow={setShow}
            update={true}
            patient={patient}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPatientModal;
