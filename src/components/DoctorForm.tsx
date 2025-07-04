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
import { addDoctor, updateDoctor } from "@/actions/doctor";

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
          name: "",
          email: "",
          phone: "",
          address: "",
          gender: "male",
          department: departmentOption[0].value,
          dob: "",
          password: "",
          cpassword: "",
        },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof doctorZodSchema>> = async (
    data,
  ) => {
    if (props.update) {
      // return updateDoctor({ data });
      try {
        const response = await updateDoctor(props.doctor._id.toString(), data);

        if (!response.success)
          return toast.error(response.message ?? "Something went wrong");

        toast.success("Doctor updated successfully");
        router.refresh();
        router.push("/dashboard/profile");
      } catch (err: any) {
        toast.error(err.message ?? "Something went wrong");
      }
    } else {
      try {
        const response = await addDoctor(data);

        if (!response.success)
          throw new Error(response.message ?? "Something went wrong");
        toast.success("Doctor added successfully");
        router.refresh();
        router.push("/dashboard/doctor");
      } catch (err: any) {
        toast.error(err.message ?? "Something went wrong");
      }
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
