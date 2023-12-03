import { MdDashboard } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import '@/components/CSS/style.css'

export default function Sidebar(){
    return(
        <div className="w-[20vw] border-r-2 border-gray-300 h-[100vh] bg-[#fafbfb] sticky top-0 left-0">
            <div className="pt-4 px-3 flex gap-2 items-center text-xl font-semibold">
            <MdDashboard/>
            <span>Hospital MS</span>
            </div>
            <ul className="my-5 border-t-2 border-gray-200 min-h-[85vh] ">
                <li>
                    <IoHomeOutline/>
                    <span>Home</span>
                </li>
                <li>
                    <IoHomeOutline/>
                    <span>Home</span>
                </li>
                <li>
                    <IoHomeOutline/>
                    <span>Home</span>
                </li>
                <li>
                    <IoHomeOutline/>
                    <span>Home</span>
                </li>
                <li>
                    <IoHomeOutline/>
                    <span>Home</span>
                </li>
                <li>
                    <IoHomeOutline/>
                    <span>Home</span>
                </li>
            </ul>
        </div>
    )
}