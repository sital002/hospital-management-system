import { FC, useState } from "react";
import DoctorForm from "../DoctorForm";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { DoctorType } from "@/database/modals/DoctorModel";

interface EditLabtestModalProps {
  doctor?: DoctorType;
}
const EditDoctorModal: FC<EditLabtestModalProps> = ({ doctor }) => {
  console.log(doctor);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="default">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-full">
            <DoctorForm
              update={true}
              doctor={doctor}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDoctorModal;
