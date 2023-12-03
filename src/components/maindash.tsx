import { useState } from "react";
import Button from "./common/Button";
import PopupForm from "./popupForm";

export default function mainDash(){
    const[popUp,setPopUp]=useState(false)

    function clickBtn(){
        setPopUp(!popUp)
    }

   
    return(
        <div>
            {popUp && <PopupForm/>}
            <Button onClick={clickBtn} className="w-fit ml-[86%]">+ Add New</Button>
            <table className="border-collapse border-2 border-gray-200 w-[77vw] text-center mt-3  ">
            <thead className="h-[60px]">
                <th>Photo</th>
                <th>Name</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Role</th>
            </thead>
            <tbody>
                <tr className="border-2 border-gray-200 h-[60px]">
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
    )
}