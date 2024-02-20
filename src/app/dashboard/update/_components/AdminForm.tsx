"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import axios from "axios";
import {
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AdminType } from "@/database/modals/AdminModal";
import { AdminFormSchema } from "../../labtechnician/_utils/AdminFormSchema";

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

type AdminFormProps =
  | {
      update: true;
      user: AdminType;
      handleAdminUpdate?: (data: any) => Promise<{
        success: boolean;
        message: string;
      }>;
      open?: boolean;
      setOpen?: (value: boolean) => void;
    }
  | {
      update?: false;
    };

export const AdminForm: FC<AdminFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof AdminFormSchema>>({
    resolver: zodResolver(AdminFormSchema),
    defaultValues: props.update
      ? {
          name: props.user.name || "",
          email: props.user?.email || "",
          address: props.user?.address || "",
          phone: props.user?.phone || "",
          dob: props.user?.dob.toString() || "",
          gender: props.user?.gender,
          password: props.user.password,
          cpassword: props.user.password,
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

  const updateuserDetails = async ({
    data,
  }: {
    data: z.infer<typeof AdminFormSchema>;
  }) => {
    // alert("update");
    if (props.update && props.handleAdminUpdate) {
      const res = await props.handleAdminUpdate(data);
      if (res.success) {
        toast.success("User Updated");
      } else {
        toast.error(res?.message);
      }
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof AdminFormSchema>> = async (
    data,
  ) => {
    if (props.update) {
      updateuserDetails({ data });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <h1 className="text-center text-3xl font-medium">
          {props.update ? "Update user" : "Create New user"}
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
            {loading ? "Loading..." : props.update ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
