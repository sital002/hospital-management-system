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
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";

type FormInputs = {
  name: string;
  id?:string;
  email: string;
  password: string;
  cpassword: string;
  phone: string;
  address: string;
  dob: Date | null;
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

interface LabTechnicianFormProps {
  show: boolean;
  setShow: (e: boolean) => void;
  labtechnician?: LabtechnicianType;
  update: boolean;
}

const LabTechnicianForm: FC<LabTechnicianFormProps> = ({
  show,
  setShow,
  labtechnician,
  update = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: update
      ? {
          name: labtechnician?.name,
          email: labtechnician?.email,
          address: labtechnician?.address,
          phone: labtechnician?.phone,
          dob: labtechnician?.dob,
        }
      : {
          name: "John Doe",
          email: "johndoe33@gmail.com",
          phone: "9860098600",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          dob: null,
          password: "Password@123",
          cpassword: "Password@123",
        },
  });

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);

  const addNewLabTechnician: SubmitHandler<FormInputs> = async (data:FormInputs) => {
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      console.log(json);
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

  const updateLabTechnicianDetails = async ({ data,router }: { data: FormInputs,router:any }) => {
    try {
      console.log('labdata: ',data);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician/${data?.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: data?.name,
            email: data?.email,
            address: data?.address,
            phone: data?.phone,
            dob: data?.dob,
          }),
        },
      );
      const json = await res.json();
      if (json) {
        if (setShow) {
          setShow(false);
        }
        toast.success("Detail updated successfully");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log('edit data',data);
    if (update) {
      updateLabTechnicianDetails({ data,router });
    } else {
      addNewLabTechnician(data);
    }
  };

  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ml-auto w-fit cursor-pointer "></div>
        <h1 className="text-center text-3xl font-medium">
          {update ? "Update LabTechnician" : "Create New LabTechnician"}
        </h1>
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
        {!update ?
        <>
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
        </>
        :""}
        <Button>{update ? "Update" : "Create New LabTechnician"}</Button>
      </form>
    </div>
  );
};

export default LabTechnicianForm;
