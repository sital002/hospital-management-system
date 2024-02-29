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
import { patientZodSchema } from "../../appointment/_utils/schema";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

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

type PatientFormProps = {
  update: true;
<<<<<<< HEAD
  patient: PatientTypePlus;
};

const FormSchema = z.object({
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

export const UpdatePatientForm = (props: PatientFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
=======
  patient: PatientType;
};

export const UpdatePatientForm = (props: PatientFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof patientZodSchema>>({
    resolver: zodResolver(patientZodSchema),
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    defaultValues: {
      name: props.patient.name,
      phone: props.patient.phone,
      address: props.patient.address,
      dob: props.patient.dob,
      gender: props.patient.gender,
<<<<<<< HEAD
      password: props.patient.password,
      cpassword: props.patient.password,
=======
      password: props.patient.password ?? "",
      cpassword: props.patient.password ?? "",
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    },
  });
  const router = useRouter();
  //   console.log(form.watch());
<<<<<<< HEAD
  function signUpPatient({ data }: { data: z.infer<typeof FormSchema> }) {
=======
  function signUpPatient({ data }: { data: z.infer<typeof patientZodSchema> }) {
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    // console.log("The data is ", data);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }

<<<<<<< HEAD
  function updatePatientDetail({ data }: { data: z.infer<typeof FormSchema> }) {
=======
  function updatePatientDetail({
    data,
  }: {
    data: z.infer<typeof patientZodSchema>;
  }) {
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    setLoading(true);
    fetch(`http://localhost:3000/api/patient/${props.patient._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          router.replace("/dashboard");
          toast.success("Account updated successfully");
          router.refresh();
          return;
        }
        return toast.error(json.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
<<<<<<< HEAD
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
=======
  const onSubmit: SubmitHandler<z.infer<typeof patientZodSchema>> = async (
    data,
  ) => {
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
    if (props.update) {
      updatePatientDetail({ data });
    } else {
      signUpPatient({ data });
    }
  };

  return (
    <div className=" w-full">
      <Form {...form}>
        <h1 className="my-6 text-center text-4xl font-semibold">
          {props.update ? "Update Patient Detail" : "Add New Patient"}
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

          <div className="my-6 flex gap-4">
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
                        <SelectTrigger>
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
          </div>

          <div className="my-3 grow">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-3 grow">
            <FormField
              control={form.control}
              name="cpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
<<<<<<< HEAD
                    <Input placeholder="2002-09-22" {...field} />
=======
                    <Input placeholder="********" {...field} />
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : props.update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
