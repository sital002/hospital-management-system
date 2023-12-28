import { FC } from "react";
import Modal from "../common/Modal";
import LabTechnicianForm from "../LabTechnicianForm";
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";

interface EditLabtestModalProps {
  setShow: (e: boolean) => void;
  show: boolean;
  labtechnician?: LabtechnicianType;
}
const EditLabTechnicianModal: FC<EditLabtestModalProps> = ({
  setShow,
  labtechnician,
  show,
}) => {
  console.log(labtechnician);
  return (
    <div>
      <Modal showModal={show} setShowModal={setShow}>
        <LabTechnicianForm
          show={show}
          setShow={setShow}
          update={true}
          labtechnician={labtechnician}
        />
      </Modal>
    </div>
  );
};

export default EditLabTechnicianModal;
