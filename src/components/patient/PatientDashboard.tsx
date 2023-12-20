"use client";
import { useState } from "react";
import { UserType } from "@/database/modals/UserModel";
import { formatDate } from "@/utils/formatDate";
import { type PatientType } from "@/database/modals/PatientModel";
import AddProfileModal from "../AddProfileModal";
import Button from "../common/Button";
import EditPatientModal from "./EditPatientModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PatientDashboardProps {
  users: PatientType[];
  user: UserType;
}
export default function PatientDashboard({
  users,
  user,
}: PatientDashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // console.log(user);
  const router = useRouter();

  function clickBtn() {
    setShowModal(!showModal);
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      toast.success(data.message);
      router.refresh();
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
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
      {setShowEditModal ? (
        <EditPatientModal
          show={showEditModal}
          //   patient={item}
          setShow={setShowEditModal}
        />
      ) : null}

      <table className="mt-3 w-[77vw] border-collapse border-2 border-gray-200 text-center  ">
        <tbody>
          <tr className="py-2">
            <td className="py-3 font-semibold uppercase">Name</td>
            <td className="py-3 font-semibold uppercase">Address</td>
            <td className="py-3 font-semibold uppercase">Patient Type</td>

            {/* <td className="py-3 font-semibold uppercase">Email</td> */}
            <td className="py-3 font-semibold uppercase">DOB</td>
            <td className="py-3 font-semibold uppercase">Gender</td>
            <td className="py-3 font-semibold uppercase">Action</td>
          </tr>

          {users.map((item) => (
            <>
              <tr
                className="h-[60px] border-2 border-gray-200"
                key={item._id.toString()}
              >
                <td className="uppercase">{item.name}</td>
                <td className="uppercase">{item?.address}</td>
                <td className="uppercase">{item?.patientType}</td>
                {/* <td>{item?.email}</td> */}
                <td className="uppercase">{formatDate(item?.dob)}</td>
                <td className="uppercase">{item?.gender}</td>
                <td className="uppercase">
                  <Button className="mr-3 w-fit">
                    <Link href={`/dashboard/patient/${item._id.toString()}`}>
                      view
                    </Link>
                  </Button>
                  <Button
                    className="mr-3 w-fit"
                    onClick={() => setShowEditModal(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="mr-3 w-fit"
                    onClick={() => handleDelete(item._id.toString())}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
