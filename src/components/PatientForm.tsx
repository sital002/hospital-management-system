"use client";
import React, { FC, useEffect, useState } from "react";
import Label from "./common/Label";
import Select from "./common/Select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PatientType } from "@/database/modals/PatientModel";

type FormInputs = {
  name: string;
  id?: string;
  phone: number;
  address: string;
  dob: string;
  gender: string;
  patientType: "inpatient" | "outpatient";
  admitType: "normal" | "emergency";
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

const patientTypeOption = [
  {
    name: "In Patient",
    value: "inpatient",
  },
  {
    name: "Out Patient",
    value: "outpatient",
  },
];

const admitType = [
  {
    name: "Normal",
    value: "normal",
  },
  {
    name: "Emergency",
    value: "emergency",
  },
];

interface PatientFormProps {
  update?: boolean;
  patient?: PatientType;
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

const addNewPatient = async ({
  data,
  router,
}: {
  data: FormInputs;
  router: any;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.success) {
      toast.success("Account created successfully");
      console.log(json);
      // router.push("/dashboard/patient");
      router.refresh();
      return;
    }
    return toast.error(json.message);
  } catch (err: any) {
    console.log(err);
    toast.error(err?.message);
  }
};

const PatientForm: FC<PatientFormProps> = ({
  patient,
  update = false,
  open,
  setOpen,
}) => {
  console.log(patient?.dob);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: update
      ? {
          id: patient?._id.toString(),
          name: patient?.name,
          phone: patient?.phone,
          address: patient?.address,
          admitType: patient?.admitType,
          patientType: patient?.patientType,
          dob: patient?.dob,
          gender: patient?.gender,
        }
      : {
          name: "John Doe",
          phone: 9860098600,
          address: "Ratnapark, Kathmandu",
          gender: "male",
          admitType: "emergency",
          patientType: "inpatient",
          dob: "",
        },
  });
  const router = useRouter();
  const updatePatientDetail = async ({ data }: { data: FormInputs }) => {
    try {
      console.log(data);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${data?.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: data?.name,
            phone: data?.phone,
            address: data?.address,
            admitType: data?.admitType,
            patientType: data?.patientType,
            dob: data?.dob,
            gender: data.gender,
          }),
        },
      );
      const json = await res.json();
      if (json) {
        toast.success("Detail updated successfully");
        router.refresh();
        if (setOpen) {
          setOpen(false);
        }

        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (update) {
      updatePatientDetail({ data });
    } else {
      addNewPatient({ data, router });
    }
  };

  return (
    <div className=" mx-auto w-full">
      {" "}
      <form
        className="mx-auto mt-4  max-w-[700px] rounded-lg  px-4 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-3xl font-medium">
          {update ? "Update Patient Detail" : "Add New Patient"}
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
          type="text"
          {...register("dob", {
            required: {
              value: true,
              message: "DOB is required",
            },
          })}
          placeholder="2002/01/01"
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
        <div className="flex items-center justify-center gap-6">
          <div>
            <Label className="block">Gender</Label>
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
            <Label>Admit Type</Label>
            <Select
              options={admitType}
              {...register("admitType", {
                required: {
                  value: true,
                  message: "Admit Type is required",
                },
              })}
            />
            <p className="text-red-800">{errors.admitType?.message}</p>
          </div>
          <div>
            <Label>Patient Type</Label>
            <Select
              options={patientTypeOption}
              {...register("patientType", {
                required: {
                  value: true,
                  message: "PatientType is required",
                },
              })}
            />
          </div>
        </div>

        <Button className="mt-4 w-full" type="submit">
          {update ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default PatientForm;
