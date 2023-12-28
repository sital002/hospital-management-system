"use client";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { PatientType } from "@/database/modals/PatientModel";
import AddProfileModal from "../AddProfileModal";
import Button from "../common/Button";
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";
import Link from "next/link";
import EditLabTechnicianModal from "./EditLabTechnician";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface LabTechnicianDashboardProps {
  users: LabtechnicianType[];
}
export default function LabTechnicianDashboard({
  users,
}: LabTechnicianDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const[selectedLabTechnician,setSelectedLabTechnician]=useState<LabtechnicianType>()
  const [showEditModal, setShowEditModal] = useState(false);

  // console.log(user);

  function clickBtn() {
    setShowModal(!showModal);
  }

  const handleEdit = async (item: LabtechnicianType) => {
    setShowEditModal(true);
    setSelectedLabTechnician(item);
  };
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician/${id}`,
        {
          method: "DELETE",
          cache: "no-store",
          credentials: "include",
        },
      );
      const data = await res.json();
      router.refresh();
      toast.success("Account Deleted Successfully");
      return data;
    } catch (err: any) {
      console.log(err?.message);
      toast.error(err?.message);
      return [];
    }
  };


  return (
    <div>
      {showModal && (
        <AddProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <Button onClick={clickBtn} className="ml-[86%] w-fit">
        + Add New
      </Button>
      <table className="mt-3 w-[77vw] border-collapse border-2 border-gray-200 text-center  ">
        <tbody>
          <tr className="py-2">
            <td className="py-3 font-semibold uppercase">Name</td>
            <td className="py-3 font-semibold uppercase">Address</td>

            <td className="py-3 font-semibold uppercase">Email</td>
            <td className="py-3 font-semibold uppercase">DOB</td>
            <td className="py-3 font-semibold uppercase">Gender</td>
            <td className="py-3 font-semibold uppercase">Action</td>
          </tr>

          {users.map((item, index) => (
            <tr className="h-[60px] border-2 border-gray-200" key={index}>
              <td className="uppercase">{item.name}</td>
              <td className="uppercase">{item?.address}</td>
              <td>{item?.email}</td>
              <td className="uppercase">{formatDate(item?.dob)}</td>
              <td className="uppercase">{item?.gender}</td>
              <td className="uppercase">
                <Link href={`/dashboard/labtechnician/${item._id.toString()}`}>
                  <Button className="mr-3 w-fit">view</Button>
                </Link>
                <Button className="mr-3 w-fit" onClick={()=>handleEdit(item)}>Edit</Button>
                <Button
                    className="mr-3 w-fit"
                    onClick={() => handleDelete(item._id.toString())}
                  >
                    Delete
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {setShowEditModal ? (
        <EditLabTechnicianModal
          show={showEditModal}
          labtechnician={selectedLabTechnician}
          setShow={setShowEditModal}
        />
      ) : null}
    </div>
  );
}
