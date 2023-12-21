"use client";
import React, { FC, useState } from "react";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../common/Input";
import Label from "../common/Label";
import Button from "../common/Button";
import Select from "../common/Select";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  phone: number;
  address: string;
  dob: string;
  gender: string;
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

interface AdminFormProps {
  // showModal: boolean;
}

const AdminForm: FC<AdminFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "John Doe",
      email: "johndoe33@gmail.com",
      phone: 9860098600,
      address: "Ratnapark, Kathmandu",
      gender: "male",
      dob: "2000-01-01",
      password: "Password@123",
      cpassword: "Password@123",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
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
    <div>
      {""}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-2 mx-auto max-w-[600px]">
        <h1 className="text-center text-3xl font-medium">Add New Admin</h1>
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

export default AdminForm;
