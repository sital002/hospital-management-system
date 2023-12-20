import { FC } from "react";
import Modal from "../common/Modal";
import PatientForm from "../PatientForm";
import { PatientType } from "@/database/modals/PatientModel";

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
  return (
    <div>
      <Modal showModal={show} setShowModal={setShow}>
        {/* <PatientForm setShowModal={setShow} update={true} patient={patient} /> */}
      </Modal>
    </div>
  );
};

export default EditPatientModal;
