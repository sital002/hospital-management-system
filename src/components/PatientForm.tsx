import React, { FC, useState } from "react";
import Label from "./common/Label";
import Select from "./common/Select";
import Input from "./common/Input";
import Button from "./common/Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormInputs = {
  name: string;
  phone: number;
  address: string;
  dob: Date | null;
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
  // showModal: boolean;
  setShowModal: (e: boolean) => void;
}
const PatientForm: FC<PatientFormProps> = ({ setShowModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "John Doe",
      phone: 9860098600,
      address: "Ratnapark, Kathmandu",
      gender: "male",
      admitType: "emergency",
      patientType: "inpatient",
      dob: null,
    },
  });

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // console.log(data);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      if (json.success) {
        toast.success("Account created successfully");
        console.log(json);
        router.refresh();
        setShowModal(false);
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
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          onClick={() => setShowModal(false)}
          className="ml-auto w-fit cursor-pointer "
        ></div>
        <h1 className="text-center text-3xl font-medium">Create New Patient</h1>
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
        <Button>Add</Button>
      </form>
    </div>
  );
};

export default PatientForm;
