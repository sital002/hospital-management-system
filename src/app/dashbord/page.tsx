'use client'

import Maindash from "@/components/maindash";
import  Sidebar  from "@/components/sidebar";

export default function page(){
    return(
        <div className="flex justify-around items-start bg-[#fafbfb]">
            <Sidebar/>
            <Maindash/>
        </div>
    )
}