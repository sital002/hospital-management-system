"use client";
import { useState } from "react";
import Button from "./common/Button";
import PopupForm from "./popupForm";

export default function MainDash() {
  const [popUp, setPopUp] = useState(false);

  function clickBtn() {
    setPopUp(!popUp);
  }

  return (
    <div>
      {popUp && <PopupForm />}
      <Button onClick={clickBtn} className="ml-[86%] w-fit">
        + Add New
      </Button>
      <table className="mt-3 w-[77vw] border-collapse border-2 border-gray-200 text-center  ">
        <thead className="h-[60px]">
          <th>Photo</th>
          <th>Name</th>
          <th>Address</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Role</th>
        </thead>
        <tbody>
          <tr className="h-[60px] border-2 border-gray-200">
            <td>DEMO</td>
            <td>Jone Doe</td>
            <td>Australia</td>
            <td>2000-1-1</td>
            <td>Male</td>
            <td>Doctor</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
