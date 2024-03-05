"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PatientType } from "@/database/modals/PatientModel";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdmitPatientSchema } from "@/schema/patient";
import { addPatient, updatePatient } from "@/actions/patient";

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

type PatientFormProps =
  | {
      update: true;
      patient: PatientType;
      open: boolean;
      setOpen: (value: boolean) => void;
    }
  | {
      update: false;
    };

const PatientForm = (props: PatientFormProps) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof AdmitPatientSchema>>({
    resolver: zodResolver(AdmitPatientSchema),
    defaultValues: props.update
      ? {
          name: props.patient.name ?? "",
          phone: props.patient.phone ?? "",
          address: props.patient.address ?? "",
          admitType: props.patient?.admitType ?? "",
          patientType: props.patient?.patientType ?? "",
          dob: props.patient.dob ?? "",
          gender: props.patient.gender ?? "",
        }
      : {
          name: "John Doe",
          phone: "9860098600",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          admitType: "emergency",
          patientType: "inpatient",
          dob: "2002/07/33",
        },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof AdmitPatientSchema>> = async (
    data,
  ) => {
    try {
      if (props.update) {
        const response = await updatePatient(
          props.patient._id.toString(),
          data,
        );
        if (!response.success) {
          throw new Error(response.message ?? "Something went wrong");
        }
        toast.success("Patient detail updated successfully");
        router.refresh();
      } else {
        const response = await addPatient(data);
        if (!response.success)
          throw new Error(response.message ?? "Something went wrong");
        toast.success("Patient added successfully");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
      console.log(err.message);
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
          <div className="my-10 flex gap-4">
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
                          <SelectValue />
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
            <div className="grow">
              <FormField
                control={form.control}
                name="admitType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AdmitType</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {admitType.map((option) => (
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
            <div className="grow">
              <FormField
                control={form.control}
                name="patientType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PatientType</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {patientTypeOption.map((option) => (
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Loading..."
              : props.update
                ? "Update"
                : "Add new Patient"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
