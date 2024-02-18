import { FC, useState } from "react";
import LabTechnicianForm from "../LabTechnicianForm";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";

interface EditLabtestModalProps {
  labtechnician: LabtechnicianType;
}
const EditStaffModal: FC<EditLabtestModalProps> = ({ labtechnician }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="default">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-full">
            <LabTechnicianForm
              update={true}
              labtechnician={labtechnician}
              open={open}
              setOpen={setOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditStaffModal;
