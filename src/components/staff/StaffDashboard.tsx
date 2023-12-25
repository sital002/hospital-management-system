"use client";
import { useState } from "react";
import { UserType } from "@/database/modals/UserModel";
import { formatDate } from "@/utils/formatDate";
import { PatientType } from "@/database/modals/PatientModel";
import AddProfileModal from "../AddProfileModal";
import Button from "../common/Button";
import { Staff, StaffType } from "@/database/modals/StaffModal";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface PatientDashboardProps {
  users: StaffType[];
}
export default function StaffDashboard({ users }: PatientDashboardProps) {
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<StaffType>();
  const router = useRouter();
  function clickBtn() {
    setShowModal(!showModal);
  }


  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/staff/${id}`,
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

  const handleEdit = async (item: StaffType) => {
    setShowEditModal(true);
    setSelectedPatient(item);
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
            <td className="py-3 font-semibold uppercase">Shift</td>
            <td className="py-3 font-semibold uppercase">Gender</td>
            <td className="py-3 font-semibold uppercase">Action</td>
          </tr>

          {users.map((item, index) => (
            <tr className="h-[60px] border-2 border-gray-200" key={index}>
              <td className="uppercase">{item.name}</td>
              <td className="uppercase">{item?.address}</td>
              <td className="uppercase">{item?.shift}</td>
              <td className="uppercase">{item?.gender}</td>
              <td className="uppercase">
              <Link href={`/dashboard/staff/${item._id.toString()}`}>
                    <Button className="mr-3 w-fit">view</Button>
                  </Link>
                <Button className="mr-3 w-fit">Edit</Button>
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
    </div>
  );
}
