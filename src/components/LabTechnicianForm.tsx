"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { LabtechnicianType } from "@/database/modals/LabtechnicianModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
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
import { LabtechnicainZodFormSchema } from "@/app/dashboard/labtechnician/_utils/labtechnicianSchema";
import axios from "axios";

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

type LabTechnicianFormProps =
  | {
      update: true;
      labtechnician: LabtechnicianType;
      open?: boolean;
      setOpen?: (value: boolean) => void;
    }
  | {
      update?: false;
    };

const LabTechnicianForm: FC<LabTechnicianFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof LabtechnicainZodFormSchema>>({
    resolver: zodResolver(LabtechnicainZodFormSchema),
    defaultValues: props.update
      ? {
          name: props.labtechnician?.name || "",
          email: props.labtechnician?.email || "",
          address: props.labtechnician?.address || "",
          phone: props.labtechnician?.phone || "",
          dob: props.labtechnician?.dob.toString() || "",
          gender: props.labtechnician?.gender,
          password: props.labtechnician.password,
          cpassword: props.labtechnician.password,
        }
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
          gender: "male",
          dob: "",
          password: "",
          cpassword: "",
        },
  });

  const router = useRouter();

  const addNewLabTechnician = async ({
    data,
    router,
  }: {
    data: z.infer<typeof LabtechnicainZodFormSchema>;
    router: any;
  }) => {
    try {
      setLoading(true);
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician`,
        {
          method: "POST",
          data,
        },
      );

      toast.success("Account created successfully");
      router.refresh();
      return;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message ?? "Failed to create account");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateLabTechnicianDetails = async ({
    data,
  }: {
    data: z.infer<typeof LabtechnicainZodFormSchema>;
  }) => {
    try {
      // console.log('labdata: ',data);
      setLoading(true);
      if (!props.update) throw new Error("Update is not allowed");
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician/${props.labtechnician?._id}`,
        {
          method: "PUT",
          data: {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            password: data.password,
            cpassword: data.cpassword,
            dob: data.dob,
            gender: data.gender,
          },
        },
      );

      if (props.update && props.setOpen) {
        props.setOpen(false);
      }
      router.refresh();
      toast.success("Detail updated successfully");
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message ?? "Failed to update details");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<
    z.infer<typeof LabtechnicainZodFormSchema>
  > = async (data) => {
    if (props.update) {
      updateLabTechnicianDetails({ data });
    } else {
      addNewLabTechnician({ data, router });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <h1 className="text-center text-3xl font-medium">
          {props.update ? "Update LabTechnician" : "Create New LabTechnician"}
        </h1>
        <form
          className="mx-auto   rounded-lg px-6 py-8 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="my-6 flex gap-4">
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
          <div className="my-6">
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

          <div className="my-6 flex gap-4">
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

          <Button className="my-2 w-full" disabled={loading}>
            {loading
              ? "Loading..."
              : props.update
                ? "Update Labtechnician"
                : "Add Labtechnician"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LabTechnicianForm;
