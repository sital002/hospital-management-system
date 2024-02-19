"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "light";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className,type='text', variant = "primary", ...rest },
  ref,
) {
  const[password,setPassword]=useState(true)
  return (
    <div className="relative">
      <input
    type={password ? type:'text'}
      ref={ref}
      className={twMerge(
        "my-2 w-full rounded-lg border border-slate-800 p-2 outline-none",
        className,
      )}
      {...rest}
    />
    {type==='password' ? (!password ? <Eye onClick={()=>setPassword(!password)} className="absolute left-[95%] cursor-pointer top-3"/>:<EyeOff onClick={()=>setPassword(!password)} className="absolute left-[95%] cursor-pointer top-3" />) : null}
    <Eye/>

    </div>
  );
});

export default Input;
