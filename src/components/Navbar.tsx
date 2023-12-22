"use client";

import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className=" relative w-full p-2 bg-[#092635]  ">
     
      <div className="flex relative justify-between items-center px-3 py-3">
        <div className="flex items-center gap-2  pt-4 text-3xl cursor-pointer font-semibold text-white">
          <MdDashboard />
          <span>Hospital MS</span>
        </div>
        <div
          className=" flex cursor-pointer gap-3"
        >
          <img
            className="h-[50px] w-[50px] rounded-full border-2 border-white p-[1px]"
            src="https://th.bing.com/th/id/OIP.HLuY60jzx5puuKjbqmWRRwHaEK?rs=1&pid=ImgDetMain"
            alt=""
          />
          <div className="text-white">
            <p className="text-lg">Sital Adhikari</p>
            <p className="text-sm">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
