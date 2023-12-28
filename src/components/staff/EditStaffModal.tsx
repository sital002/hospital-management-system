import { FC } from "react";
import Modal from "../common/Modal";
import StaffForm from "../StaffForm";
import { StaffType } from "@/database/modals/StaffModal";

interface EditLabtestModalProps {
  setShow: (e: boolean) => void;
  show: boolean;
  staff?: StaffType;
}
const EditStaffModal: FC<EditLabtestModalProps> = ({
  setShow,
  staff,
  show,
}) => {
  console.log(staff);
  return (
    <div>
      <Modal showModal={show} setShowModal={setShow}>
        <StaffForm
          show={show}
          setShow={setShow}
          update={true}
          staff={staff}
        />
      </Modal>
    </div>
  );
};

export default EditStaffModal;
