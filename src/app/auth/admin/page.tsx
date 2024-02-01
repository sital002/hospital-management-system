"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label"

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

type FormInputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
  const[select,setSelect]=useState({
    'admin':true,
    'doctor':false,
    'staff':false
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/${select.admin ? 'admin':(select.staff ? 'staff':(select.doctor ? 'doctor':''))}/signin`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      if (json.success) {
        toast.success("Logged in successfully");
        router.push("/dashboard");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  watch();

  const handleTab=(value:string)=>{
    setSelect({
      'admin':value==='admin'?true:false,
      'doctor':value==='doctor'?true:false,
    'staff':value==='staff'?true:false
    })
  }
  return (
    <div className="mx-2 w-full  rounded-lg p-5 ">
     <div className="mx-auto max-w-[500px] shadow-md border-2 rounded-md p-4 mt-10">
     <div className="flex items-center gap-1 my-5">
      <Button onClick={()=>handleTab('admin')} size={'lg'}  className={`grow  text-lg rounded-sm shadow-md hover:bg-purple-500 ${select.admin ? 'bg-purple-500':'bg-neutral-400'}`}>Admin</Button>
      <Button onClick={()=>handleTab('staff')} size={'lg'} className={`grow text-lg  rounded-sm shadow-md hover:bg-purple-500 ${select.staff ? 'bg-purple-500':'bg-neutral-400'}`}>Staff</Button>
      <Button onClick={()=>handleTab('doctor')} size={'lg'} className={`grow  text-lg rounded-sm shadow-md hover:bg-purple-500 ${select.doctor ? 'bg-purple-500':'bg-neutral-400'}`}>Doctor</Button>
     </div>
      <form onSubmit={handleSubmit(onSubmit)}>
       <div>
       <Label className="my-3">Email</Label>
        <Input
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          placeholder="johndoe@gmail.com"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
       </div>
       <div className="my-6">
       <Label className="my-3">Password</Label>
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 64,
              message: "Password must be less than 64 characters long",
            },
          })}
          placeholder="Password@123"
          type="text"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
       </div>
        <Button className="w-full text-xl" type="submit">Submit</Button>
      </form>
      <p className="mt-6">
        Don&apos;t have an account?{" "}
        <span className="cursor-pointer font-medium underline underline-offset-4">
          <Link href="/signup">Signup here</Link>
        </span>
      </p>
     </div>
    </div>
  );
}
