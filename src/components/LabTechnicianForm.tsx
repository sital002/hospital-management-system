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

type FormInputs = {
  name: string;
  id?: string;
  email: string;
  password: string;
  cpassword: string;
  phone: string;
  address: string;
  dob: Date | null;
  gender: string;
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

type LabTechnicianFormProps = {
  update: boolean;
  labtechnician: LabtechnicianType;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  name: z.string({
    required_error: "Name is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }).optional(),
  cpassword: z.string({
    required_error: "Password is required",
  }).optional(),
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
});

const LabTechnicianForm: FC<LabTechnicianFormProps> = ({
  open,
  setOpen,
  labtechnician,
  update = false,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: update
      ? {
          name: labtechnician?.name || "",
          email: labtechnician?.email || "",
          address: labtechnician?.address || "",
          phone: labtechnician?.phone || "",
          dob: labtechnician?.dob.toString() || "",
        }
      : {
          name: "John Doe",
          email: "johndoe33@gmail.com",
          phone: "9860098600",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          dob: "2002-03-23",
          password: "Password@123",
          cpassword: "Password@123",
        },
  });

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);

  const addNewLabTechnician = async ({
    data,
    router,
  }: {
    data: z.infer<typeof FormSchema>;
    router: any;
  }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      const json = await res.json();
      console.log(json);
      if (json.success) {
        toast.success("Account created successfully");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const updateLabTechnicianDetails = async ({
    data,
  }: {
    data: z.infer<typeof FormSchema>;
  }) => {
    try {
      // console.log('labdata: ',data);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtechnician/${labtechnician?._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            dob: data.dob,
          }),
        },
      );
      const json = await res.json();
      if (json) {
        if (setOpen) {
          setOpen(false);
        }
        toast.success("Detail updated successfully");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    console.log("edit data", data);
    if (update) {
      updateLabTechnicianDetails({ data });
    } else {
      addNewLabTechnician({ data, router });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <h1 className="text-center text-3xl font-medium">
          {update ? "Update LabTechnician" : "Create New LabTechnician"}
        </h1>
        <form
          className="mx-auto mt-10  rounded-lg px-20 py-8 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="my-10 flex gap-4">
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
                      <Input placeholder="johndoe@gmail.com" {...field} />
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
          <div className="my-10 flex gap-4">
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

         {
          !update ? (<>
           <div className="my-10 flex gap-4">
            <div className="grow">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*********" {...field} />
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
                      <Input placeholder="*********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          </>):null
         }

          <Button className="my-4 w-full">
            {update ? "Update" : "Add LabTechnician"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LabTechnicianForm;
