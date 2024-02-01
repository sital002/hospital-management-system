import { FC } from "react";
import Modal from "../common/Modal";
import { DoctorType } from "@/database/modals/DoctorModel";
import DoctorForm from "../DoctorForm";

interface EditLabtestModalProps {
  setShow: (e: boolean) => void;
  show: boolean;
  doctor?: DoctorType;
}
const EditDoctorModal: FC<EditLabtestModalProps> = ({
  setShow,
  doctor,
  show,
}) => {
  console.log(doctor);
  return (
    <div>
      <Modal showModal={show} setShowModal={setShow}>
        <DoctorForm
          show={show}
          setShow={setShow}
          update={true}
          doctor={doctor}
        />
      </Modal>
    </div>
  );
};

export default EditDoctorModal;
