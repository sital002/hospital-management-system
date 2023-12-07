"use client";

import { FC, FormEvent } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import { X } from "lucide-react";
import Label from "./common/Label";
import Select from "./common/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface PopUpFormProps {
  setPopUp: (e: boolean) => void;
}

type FormInputs = {
  name: string;
  email: string;
  password: string;
  cpassword: string;
  phone: number;
  address: string;
  dob: string;
  gender: string;
  role: string;
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

const roleOptions = [
  {
    name: "Doctor",
    value: "doctor",
  },
  {
    name: "Patient",
    value: "patient",
  },
  {
    name: "Staff",
    value: "staff",
  },
  {
    name: "Admin",
    value: "admin",
  },
];
const PopupForm: FC<PopUpFormProps> = ({ setPopUp }) => {
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
      role: "doctor",
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/user`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      if (json.success) {
        toast.success("Account created successfully");
        router.refresh();
        setPopUp(false);
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="fixed inset-0 z-10 flex min-h-screen w-screen items-center justify-center  bg-gray-300 ">
      <form
        className="z-20 max-w-2xl rounded-lg border-2 border-gray-200 bg-[#fafbfb] p-5 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          onClick={() => setPopUp(false)}
          className="ml-auto w-fit cursor-pointer "
        >
          <X className="text-2xl" />
        </div>
        <h1 className="text-center text-3xl font-medium">Create New User</h1>
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
        <Label>Role</Label>
        <Select
          options={roleOptions}
          {...register("role", {
            required: {
              value: true,
              message: "Role is required",
            },
          })}
        />
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
        <Button>Add</Button>
      </form>
    </div>
  );
};

export default PopupForm;
