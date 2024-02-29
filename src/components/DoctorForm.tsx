"use client";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DoctorType } from "@/database/modals/DoctorModel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { doctorZodSchema } from "@/app/dashboard/doctor/_utils/doctorSchema";
import axios, { AxiosError } from "axios";

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

const departmentOption = [
  {
    name: "Physician",
    value: "physician",
  },
  {
    name: "Dentiest",
    value: "dentiest",
  },
];

type DoctorFormProps =
  | {
      update: true;
      doctor: DoctorType;
      open?: boolean;
      setOpen?: (value: boolean) => void;
    }
  | {
      update?: false;
    };

const DoctorForm: FC<DoctorFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof doctorZodSchema>>({
    resolver: zodResolver(doctorZodSchema),
    defaultValues: props.update
      ? {
          name: props.doctor?.name || "",
          email: props.doctor?.email || "",
          phone: props.doctor?.phone || "",
          address: props.doctor?.address || "",
          gender: props.doctor?.gender || "",
          password: props.doctor.password,
          cpassword: props.doctor.password,
          department: props.doctor?.department ?? departmentOption[0].value,
          dob: props.doctor?.dob.toString() || "",
        }
      : {
          name: "John Doe",
          email: "johndoe33@gmail.com",
          phone: "9860098600",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          department: departmentOption[0].value,
          dob: "2002",
          password: "Password@123",
          cpassword: "Password@123",
        },
  });

  const router = useRouter();

  const addNewDoctor = async (
    data: z.infer<typeof doctorZodSchema>,
    router: any,
  ) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor`,
        {
          method: "POST",
          data,
        },
      );
      toast.success("Doctor added successfully");
      router.refresh();
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message ?? "Failed to add doctor");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateDoctor = async ({
    data,
  }: {
    data: z.infer<typeof doctorZodSchema>;
  }) => {
    try {
      console.log(data);
      if (!props.update) throw new Error("Invalid request");
      setLoading(true);
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${props.doctor?._id}`,
        {
          method: "PUT",
          data: {
            name: data.name,
            phone: data.phone,
            address: data.address,
            dob: data.dob,
            password: data.password,
            email: data.email,
            cpassword: data.password,
            gender: data.gender,
            department: data.department,
          },
        },
      );

      toast.success("Detail updated successfully");
      router.refresh();
      if (props.update && props.setOpen) {
        return props.setOpen(false);
      }
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message ?? "Failed to update doctor");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof doctorZodSchema>> = async (
    data,
  ) => {
    if (props.update) {
      return updateDoctor({ data });
    } else {
      addNewDoctor(data, router);
    }
  };

  return (
    <div className="w-full ">
      {""}
      <Form {...form}>
        <h1 className="text-center text-3xl font-bold">
          {props.update ? "Update Doctor" : "Create New Doctor"}
        </h1>
        <form
          className="mx-auto rounded-lg  px-6 py-8  "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="my-4 flex gap-4">
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@gmail.com"
                        disabled={props.update}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="my-6 flex gap-4">
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
            <div className="grow">
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
          </div>
          <div className="grow">
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentOption.map((option) => (
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
          </div>

<<<<<<< HEAD
          {!update ? (
            <>
              <div className="flex gap-4">
                <div className="grow">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type={'password'} placeholder="*********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grow">
                  <FormField
                    control={form.control}
                    name="cpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type={'password'}placeholder="*********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
=======
          <>
            <div className="flex gap-4">
              <div className="grow">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
              </div>
              <div className="grow">
                <FormField
                  control={form.control}
                  name="cpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={"password"}
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </>

          <Button className="my-6 w-full" disabled={loading}>{`${
            loading ? "Loading..." : props.update ? "Update" : "Add Doctor"
          }`}</Button>
        </form>
      </Form>
    </div>
  );
};

export default DoctorForm;
