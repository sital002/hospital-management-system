"use client";
import React, { FC, useState } from "react";
import Label from "./common/Label";
import Select from "./common/Select";
import Input from "./common/Input";
import Button from "./common/Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { StaffType } from "@/database/modals/StaffModal";

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
const StaffForm: FC<StaffFormProps> = ({show,setShow,staff,update=false}) => {
  const {
    register,
    handleSubmit,
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

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);

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
    <div className="absolute left-[55%] top-[55%] w-full max-w-[600px] -translate-x-[50%] -translate-y-[40%] rounded-lg bg-neutral-200 px-4 py-8">
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ml-auto w-fit cursor-pointer "></div>
        <h1 className="text-center text-3xl font-medium">Create New Staff</h1>
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
        <div className="flex items-center gap-10">
          <div>
            <Label>Gender</Label>
            <Select
              options={genderOptions}
              {...register("gender", {
                required: {
                  value: true,
                  message: "Gender is required",
                },
              })}
            />
            <p className="text-red-800">{errors.gender?.message}</p>
          </div>
          <div>
            <Label>Shift</Label>
            <Select
              options={workShift}
              {...register("shift", {
                required: {
                  value: true,
                  message: "Shift is required",
                },
              })}
            />
            <p className="text-red-800">{errors.shift?.message}</p>
          </div>
        </div>
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
        <Button>Add</Button>
      </form>
    </div>
  );
};

export default StaffForm;
