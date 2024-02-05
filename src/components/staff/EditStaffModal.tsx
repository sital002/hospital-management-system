import { FC, useState } from "react";
import StaffForm from "../StaffForm";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { StaffType } from "@/database/modals/StaffModal";

interface EditLabtestModalProps {
  staff: StaffType;
}
const EditStaffModal: FC<EditLabtestModalProps> = ({ staff }) => {
  console.log(staff);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant="default">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <div className="w-full">
            <StaffForm
              update={true}
              staff={staff}
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
