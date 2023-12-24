"use client";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import AddProfileModal from "../AddProfileModal";
import Button from "../common/Button";
import { type DoctorType } from "@/database/modals/DoctorModel";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DoctorDashboardProps {
  users: DoctorType[];
}
export default function DoctorDashboard({ users }: DoctorDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  function clickBtn() {
    setShowModal(!showModal);
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${id}`,
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
            {/* <td className="py-3 font-semibold uppercase">Patient Type</td> */}

            <td className="py-3 font-semibold uppercase">Email</td>
            <td className="py-3 font-semibold uppercase">DOB</td>
            <td className="py-3 font-semibold uppercase">Gender</td>
            <td className="py-3 font-semibold uppercase">Action</td>
          </tr>

          {users.map((item, index) => (
            <tr className="h-[60px] border-2 border-gray-200" key={index}>
              <td className="uppercase">{item.name}</td>
              <td className="uppercase">{item?.address}</td>
              <td className="uppercase">{item?.email}</td>
              {/* <td>{item?.email}</td> */}
              <td className="uppercase">{formatDate(item?.dob)}</td>
              <td className="uppercase">{item?.gender}</td>
              <td className="uppercase">
                <Button className="mr-3 w-fit">View</Button>
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
