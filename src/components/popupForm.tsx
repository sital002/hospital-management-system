
import Button from "./common/Button";
import Input from "./common/Input";
import { IoIosCloseCircleOutline } from "react-icons/io";


export default function PopupForm(){
    return(
        <form className="w-[30vw] border-2 border-gray-200 p-5 absolute bg-[#fafbfb] shadow-md left-[40%] top-2" action="">
            <IoIosCloseCircleOutline className={'absolute left-[93%] top-[1%] text-2xl'}/>
            <h1 className="text-center text-3xl font-semibold">Add Details</h1>
            <label htmlFor="">Name</label>
            <Input/>
            <label htmlFor="">Email</label>
            <Input/>
            <label htmlFor="">Phone</label>
            <Input/>
            <label htmlFor="role">Role</label>
            <select className="block w-[150px] h-[50px] rounded-md px-3" name="" id="role">
                <option value="">Doctor</option>
                <option value="">Patient</option>
                <option value="">Staff</option>
            </select>
            <label htmlFor="">Password</label>
            <Input/>
            <label htmlFor="">Confirm Password</label>
            <Input/>
            <Button>Add</Button>
        </form>
    )
}