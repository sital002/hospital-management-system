"use client";
import React, { FC, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PatientType } from "@/database/modals/PatientModel";

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
import { patientZodSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import axios from "axios";

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
    defaultValues: props.update
      ? {
          name: props.patient.name,
          phone: props.patient.phone,
          email: props.patient.email ?? "",
          address: props.patient.address,
          dob: props.patient.dob,
          password: props.patient.password ?? "",
          cpassword: props.patient.password ?? "",
          gender: props.patient.gender,
        }
      : {
          name: "",
          phone: "",
          address: "",
          gender: "male",
          email: "",
          password: "",
          cpassword: "",
          dob: "",
        },
  });
  const router = useRouter();
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
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data.message ?? "Failed to create account");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function updatePatientDetail({
    data,
  }: {
    data: z.infer<typeof patientZodSchema>;
  }) {
    if (!props.update) return;
    // console.log("The data is ", data);
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
    } else {
      signUpPatient({ data });
    }
  };

  return (
    <div className=" w-full">
      <Form {...form}>
        <h1 className="my-6 text-center text-4xl font-semibold">
          {props.update ? "Update your Detail" : "Create New Account"}
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
                  <FormLabel>
                    DOB <span className="text-slate-400">(YYYY/MM/DD)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="2002/09/22" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-10 flex items-center gap-4">
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
                        placeholder="**********"
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
            {loading ? "Loading..." : props.update ? "Update" : "Signup"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PatientSignup;
