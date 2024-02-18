"use client";
import React, { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StaffType } from "@/database/modals/StaffModal";
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
import { StaffFormSchema } from "@/app/dashboard/patient/appointment/utils/schema";

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

const workShift = [
  {
    name: "Morning",
    value: "morning",
  },
  {
    name: "Evening",
    value: "evening",
  },
  {
    name: "Night",
    value: "night",
  },
];

type StaffFormProps =
  | {
      update: true;
      staff: StaffType;
      open: boolean;
      setOpen: (value: boolean) => void;
    }
  | {
      update: false;
    };

const StaffForm: FC<StaffFormProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof StaffFormSchema>>({
    resolver: zodResolver(StaffFormSchema),
    defaultValues: props.update
      ? {
          name: props.staff?.name || "",
          address: props.staff?.address || "",
          gender: props.staff?.gender || "",
          phone: props.staff?.phone || "",
          dob: props.staff?.dob?.toString() || "",
          shift: props.staff?.shift || "",
          email: props.staff?.email || "",
        }
      : {
          name: "John Doe",
          email: "johndoe33@gmail.com",
          phone: "9876543210",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          dob: "2002/02/12",
          shift: "morning",
          password: "Password@123",
          cpassword: "Password@123",
        },
  });

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);
  console.log(form.watch());
  const createNewStaff = async (
    data: z.infer<typeof StaffFormSchema>,
    router: any,
  ) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Account created successfully");
        router.refresh();
        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStaffDetail = async (data: z.infer<typeof StaffFormSchema>) => {
    try {
      console.log(data);
      if (!props.update) return;
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/staff/${props.staff?._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: data?.name,
            phone: data?.phone,
            address: data?.address,
            shift: data?.shift,
            email: data?.email,
            dob: data?.dob,
            gender: data.gender,
          }),
        },
      );
      const json = await res.json();
      if (json) {
        toast.success("Detail updated successfully");
        router.refresh();
        if (props.update) {
          props.setOpen(false);
        }

        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof StaffFormSchema>> = async (
    data,
  ) => {
    if (props.update) {
      updateStaffDetail(data);
    } else {
      createNewStaff(data, router);
    }
  };

  return (
    <div className="max-h-[600px] px-6">
      <Form {...form}>
        <h1 className=" text-center text-4xl font-semibold">
          {props.update ? "Update Staff details" : "Create New Staff"}
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="my-4 flex gap-4 ">
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
          <div className="my-10 flex gap-4 ">
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
          </div>
          <div className="flex gap-4">
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
            <div className="grow">
              <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shift</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {workShift.map((option) => (
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
          {props.update ? null : (
            <>
              <div className="my-10 flex gap-4 ">
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
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StaffForm;
