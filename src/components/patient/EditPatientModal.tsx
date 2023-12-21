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
  console.log(patient);
  return (
    <div>
      <Modal showModal={show} setShowModal={setShow}>
        <PatientForm
          show={show}
          setShow={setShow}
          update={true}
          patient={patient}
        />
      </Modal>
    </div>
  );
};

export default EditPatientModal;
