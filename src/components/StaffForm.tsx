"use client";
import React, { FC, useState } from "react";
import Label from "./common/Label";
import {Select, SelectContent, SelectItem, SelectTrigger,SelectValue} from "./ui/select";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StaffType } from "@/database/modals/StaffModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

type FormInputs = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  phone: string;
  address: string;
  dob: Date | null ;
  gender: string;
  role: string;
  shift: string;
  department: string;
};

const genderOptions = [
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
];

const workShift = [
  {
    name: "Morning",
    value: "morning",
  },
  {
    name: "Evening",
    value: "evening",
  },
  {
    name: "Night",
    value: "night",
  },
];

interface StaffFormProps {
  show?:boolean;
  setShow?: (e: boolean) => void;
  staff?: StaffType;
  update?:boolean;
}
const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
    name:z.string({
      required_error:"Name is required"
    }),
    password:z.string(
      {
        required_error:"Password is required"
      }
    ),
    cpassword:z.string({
      required_error:"Password is required"
    }),
    phone:z.string({
      required_error:"Phone is required"
    }),
    address:z.string({
      required_error:"Address is required"
    }),
    dob:z.string({
      required_error:"date is requireds"
    }),
    gender:z.string({
      required_error:"Gender is required"
    }),
    shift:z.string({
      required_error:'shift is required'
    })
})
const StaffForm: FC<StaffFormProps> = ({show,setShow,staff,update=false}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: update ?{
      name:staff?.name,
      address:staff?.address,
      gender:staff?.gender,
      phone:staff?.phone,
      dob:staff?.dob,
      shift:staff?.shift,
      email:staff?.email
    } :{
      name: "John Doe",
      email: "johndoe33@gmail.com",
      phone: "s",
      address: "Ratnapark, Kathmandu",
      gender: "male",
      dob: null,
      shift: "morning",
      password: "Password@123",
      cpassword: "Password@123",
    },
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: update ?{
      name:staff?.name || "",
      address:staff?.address || "",
      gender:staff?.gender || "",
      phone:staff?.phone || "",
      dob:staff?.dob || "",
      shift:staff?.shift || "",
      email:staff?.email || ""
    } :{
      name: "John Doe",
      email: "johndoe33@gmail.com",
      phone: "s",
      address: "Ratnapark, Kathmandu",
      gender: "male",
      dob: "",
      shift: "morning",
      password: "Password@123",
      cpassword: "Password@123",
    },
    
  })

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);
console.log(watch());
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Account created successfully");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className=" w-full">
      {" "}
      <form className="mx-auto rounded-lg px-28 py-8 mt-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="ml-auto w-fit cursor-pointer "></div>
        <h1 className="text-center my-10 text-4xl font-medium">Create New Staff</h1>
       <div className="flex gap-6 my-10">
       <div className="grow ">
       <Label>Name</Label>
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 64,
              message: "Name must be less than 64 characters long",
            },
          })}
          placeholder="John Doe"
        />
        <p className="text-red-800">{errors.name?.message}</p>
       </div>
       <div className="grow">
       <Label>Email</Label>
        <Input
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            maxLength: {
              value: 64,
              message: "Email must be less than 64 characters long",
            },
          })}
          placeholder="johndoe@gmail.com"
        />
        <p className="text-red-800">{errors.email?.message}</p>
       </div>
        <div className="grow">
        <Label>Phone</Label>
        <Input
          {...register("phone", {
            required: {
              value: true,
              message: "Phone is required",
            },
            maxLength: {
              value: 64,
              message: "Phone must be less than 64 characters long",
            },
          })}
          placeholder="+97700000000"
          />
        <p className="text-red-800">{errors.phone?.message}</p>
        </div>
          </div>
       <div className="flex gap-6 my-10">
       <div className="grow ">
       <Label>DOB</Label>
        <Input
          {...register("dob", {
            required: {
              value: true,
              message: "DOB is required",
            },
            maxLength: {
              value: 64,
              message: "DOb must be less than 64 characters long",
            },
          })}
          placeholder="2002/01/01"
          type="date"
        />
        <p className="text-red-800">{errors.dob?.message}</p>
       </div>
       <div className="grow ">
       <Label>Address</Label>
        <Input
          {...register("address", {
            required: {
              value: true,
              message: "Address is required",
            },
            maxLength: {
              value: 64,
              message: "Address must be less than 64 characters long",
            },
          })}
          placeholder="Ratnapark, Kathmandu"
        />
        <p className="text-red-800">{errors.address?.message}</p>
       </div>
       </div>
        <div className="flex items-center gap-10 my-10">
          <div>
            <Label>Gender</Label>
           
<Select   {
        ...register("gender", {
          required: {
            value: true,
            message: "Gender is required",
          },
        })
} defaultValue={"female"} >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select Gender"  />
  </SelectTrigger>
  <SelectContent>
    {
      genderOptions.map((item,index)=>{
return ( <SelectItem key={index} value={item.value}>{item.name}</SelectItem>)
      })
    }
  </SelectContent>
</Select>
          </div>
<div>
<Label>Shift</Label>
          <Select >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Workshift"  />
  </SelectTrigger>
  <SelectContent>
    {
      workShift.map((item,index)=>{
return ( <SelectItem key={index} value={item.value}>{item.name}</SelectItem>)
      })
    }
  </SelectContent>
</Select>
</div>

          <div>
            <p className="text-red-800">{errors.shift?.message}</p>
          </div>
        </div>
       <div className="flex gap-4">
       <div className="grow">
        <Label>Password</Label>
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            maxLength: {
              value: 64,
              message: "Password must be less than 64 characters long",
            },
          })}
          placeholder="xxxxxxxxx"
        />
        <p className="text-red-800">{errors.password?.message}</p>
        </div>
        <div className="grow">
        <Label>Confirm password</Label>
        <Input
          {...register("cpassword", {
            required: {
              value: true,
              message: "Confirm password is required",
            },
            maxLength: {
              value: 64,
              message: "Confirm password must be less than 64 characters long",
            },
          })}
          placeholder="xxxxxxxxx"
        />
        <p className="text-red-800">{errors.cpassword?.message}</p>
        </div>
       </div>
        <Button className=" p-6 w-full my-8">{`${update ? 'Update': 'Add Staff'}`}</Button>
      </form>
    </div>
  );
};

export default StaffForm;
