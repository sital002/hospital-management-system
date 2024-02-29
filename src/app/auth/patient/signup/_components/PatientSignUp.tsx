"use client";
import React, { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { PatientType, PatientTypePlus } from "@/database/modals/PatientModel";
=======
import { PatientType } from "@/database/modals/PatientModel";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import { patientZodSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import axios from "axios";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

type FormInputs = {
  name: string;
  id?: string;
  phone: string;
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

<<<<<<< HEAD
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

type PatientFormProps =
  | {
      update: true;
      patient: PatientTypePlus;
      open: boolean;
      setOpen: (value: boolean) => void;
    }
  | {
      update: false;
    };

const FormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name cannot be less than 3 characters"),
  phone: z
    .string({
      required_error: "Phone is required",
      invalid_type_error: "Invalid phone type",
    })
    .min(10, "Phone number cannot be less than 10 characters"),
  dob: z
    .string({
      invalid_type_error: "DOB must be a string",
      required_error: "DOB is required",
    })
    .min(1, "DOB is required"),
  address: z
    .string({
      invalid_type_error: "Address must be a string",
      required_error: "Address is required",
    })
    .min(1, "Address is required"),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender type",
  }),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
  cpassword: z
    .string({
      invalid_type_error: "Confirm Password must be a string",
      required_error: "Confirm Password is required",
    })
    .min(8, "Confirm Password must be at least 8 characters long"),
});

const PatientSignup = (props: PatientFormProps) => {
  const [loading, setLoading] = useState(false);
  // const { update, patient, open, setOpen } = props;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
=======
type PatientFormProps =
  | {
      update?: true;
      patient: PatientType;
    }
  | {
      update?: false;
    };

const PatientSignup = (props: PatientFormProps) => {
  const [loading, setLoading] = useState(false);
  // console.log(props.patient, "the patient is");
  const form = useForm<z.infer<typeof patientZodSchema>>({
    resolver: zodResolver(patientZodSchema),
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    defaultValues: props.update
      ? {
          name: props.patient.name,
          phone: props.patient.phone,
<<<<<<< HEAD
          address: props.patient.address,
          dob: props.patient.dob,
=======
          email: props.patient.email ?? "",
          address: props.patient.address,
          dob: props.patient.dob,
          password: props.patient.password ?? "",
          cpassword: props.patient.password ?? "",
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
          gender: props.patient.gender,
        }
      : {
          name: "John Doe",
          phone: "9860098600",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          email: "test@gmail.com",
          password: "Password@123",
          cpassword: "Password@123",
          dob: "2002/07/33",
        },
  });
  const router = useRouter();
<<<<<<< HEAD
  console.log(form.watch());
  function signUpPatient({ data }: { data: z.infer<typeof FormSchema> }) {
    console.log("The data is ", data);
    setLoading(true);
    fetch(`http://localhost:3000/api/patient/signup`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          router.replace("/dashboard");
          toast.success("Account created successfully");
          router.refresh();
          return;
        }
        return toast.error(json.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
=======
  function signUpPatient({ data }: { data: z.infer<typeof patientZodSchema> }) {
    console.log("The data is ", data);
    setLoading(true);
    axios(`/api/patient/signup`, {
      method: "POST",
      data,
    })
      .then((res) => {
        console.log(res);
        // toast.success("Patient added successfully");
        toast.success("Account created succesfully");
        router.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.message ?? "Failed to create account");
        }
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
      })
      .finally(() => {
        setLoading(false);
      });
  }
<<<<<<< HEAD

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (props.update) {
      //   updatePatientDetail({ data });
=======
  function updatePatientDetail({
    data,
  }: {
    data: z.infer<typeof patientZodSchema>;
  }) {
    if (!props.update) return;
    console.log("The data is ", data);
    setLoading(true);
    axios(`/api/patient/update?id=${props.patient._id}`, {
      method: "PUT",
      withCredentials: true,
      data,
    })
      .then((res) => {
        console.log(res);
        // toast.success("Patient added successfully");
        toast.success("Account updated succesfully");
        router.replace("/dashboard");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.message ?? "Failed to update account");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const onSubmit: SubmitHandler<z.infer<typeof patientZodSchema>> = async (
    data,
  ) => {
    if (props.update) {
      updatePatientDetail({ data });
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    } else {
      signUpPatient({ data });
    }
  };

  return (
    <div className=" w-full">
      <Form {...form}>
        <h1 className="my-6 text-center text-4xl font-semibold">
<<<<<<< HEAD
          {props.update ? "Update Patient Detail" : "Add New Patient"}
=======
          {props.update ? "Update your Detail" : "Create New Account"}
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
        </h1>

        <form className=" mt-4  px-10" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="grow">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grow">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="97++++++++" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="my-6 grow">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Ratnangar-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-6 grow">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
<<<<<<< HEAD
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input placeholder="2002-09-22" {...field} />
=======
                  <FormLabel>
                    DOB <span className="text-slate-400">(YYYY/MM/DD)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="2002/09/22" {...field} />
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
<<<<<<< HEAD
          <div className="my-10 items-center flex gap-4">
=======
          <div className="my-10 flex items-center gap-4">
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
            <div className="grow">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-[47px] border-black">
                          <SelectValue placeholder={"Select Gender"} />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-2 grow">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="test@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="my-6 grow">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={"password"}
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-6 grow">
              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={"password"}
<<<<<<< HEAD
                        placeholder="2002-09-22"
=======
                        placeholder="**********"
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
<<<<<<< HEAD
            {loading ? "Loading..." : props.update ? "Update" : "Create"}
=======
            {loading ? "Loading..." : props.update ? "Update" : "Signup"}
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PatientSignup;
