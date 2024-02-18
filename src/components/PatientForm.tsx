"use client";
import React, { FC, useEffect, useState } from "react";
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

type PatientFormProps = {
  update?: boolean;
  patient?: PatientType;
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

const FormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  phone: z.string({
    required_error: "Phone is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  dob: z.string({
    required_error: "date is requireds",
  }),
  gender: z.string({
    required_error: "Gender is required",
  }),
  admitType: z.string({
    required_error: "AdmitType is required",
  }),
  patientType: z.string({
    required_error: "PatientType is required",
  }),
});


const PatientForm = ({
  patient,
  update = false,
  open,
  setOpen,
}: PatientFormProps) => {
  const [loading, setLoading] = useState(false);
  console.log(patient?.dob);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: update
      ? {
          name: patient?.name ?? "",
          phone: patient?.phone ?? "",
          address: patient?.address ?? "",
          admitType: patient?.admitType ?? "",
          patientType: patient?.patientType ?? "",
          dob: patient?.dob ?? "",
          gender: patient?.gender ?? "",
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
  const addNewPatient = async ({
    data,
    router,
  }: {
    data: z.infer<typeof FormSchema>;
    router: any;
  }) => {
  
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patient`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log(json)
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
    } finally{
      setLoading(false)
    }
  };


  const updatePatientDetail = async ({
    data,
  }: {
    data: z.infer<typeof FormSchema>;
  }) => {
    try {
      console.log(data);
      setLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/patient/${patient?._id}`,
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
    } finally{
      setLoading(false)
    }
  };
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (update) {
      updatePatientDetail({ data });
    } else {
      addNewPatient({ data, router });
    }
  };

  return (
    <div className=" w-full">
      <Form {...form}>
        <h1 className="my-6 text-center text-4xl font-semibold">
          {update ? "Update Patient Detail" : "Add New Patient"}
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
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input placeholder="2002-09-22" {...field} />
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
            {loading ? 'Loading...':update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PatientForm;
