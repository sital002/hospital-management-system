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
import { patientZodSchema } from "../../appointment/_utils/schema";

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
  patient: PatientType;
};

export const UpdatePatientForm = (props: PatientFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof patientZodSchema>>({
    resolver: zodResolver(patientZodSchema),
    defaultValues: {
      name: props.patient.name,
      phone: props.patient.phone,
      address: props.patient.address,
      dob: props.patient.dob,
      gender: props.patient.gender,
      password: props.patient.password ?? "",
      cpassword: props.patient.password ?? "",
    },
  });
  const router = useRouter();
  //   console.log(form.watch());
  function signUpPatient({ data }: { data: z.infer<typeof patientZodSchema> }) {
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

  function updatePatientDetail({
    data,
  }: {
    data: z.infer<typeof patientZodSchema>;
  }) {
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
                    <Input placeholder="********" {...field} />
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
