"use client";
import React, { FC } from "react";
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

type StaffFormProps = {
  update: boolean;
  staff: StaffType;
  open: boolean;
  setOpen: (value: boolean) => void;
};

type UpdateProps = StaffFormProps["update"] extends true ? StaffFormProps : {};
const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  name: z.string({
    required_error: "Name is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .optional(),
  cpassword: z
    .string({
      required_error: "Password is required",
    })
    .optional(),
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
  shift: z.string({
    required_error: "shift is required",
  }),
});
const StaffForm: FC<StaffFormProps> = ({
  open,
  setOpen,
  staff,
  update = false,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: update
      ? {
          name: staff?.name || "",
          address: staff?.address || "",
          gender: staff?.gender || "",
          phone: staff?.phone || "",
          dob: staff?.dob?.toString() || "",
          shift: staff?.shift || "",
          email: staff?.email || "",
        }
      : {
          name: "John Doe",
          email: "johndoe33@gmail.com",
          phone: "s",
          address: "Ratnapark, Kathmandu",
          gender: "male",
          dob: "2002",
          shift: "morning",
          password: "Password@123",
          cpassword: "Password@123",
        },
  });

  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);
  console.log(form.watch());
  const createNewStaff = async (
    data: z.infer<typeof FormSchema>,
    router: any,
  ) => {
    console.log(data);
    try {
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
    }
  };

  const updateStaffDetail = async (data: z.infer<typeof FormSchema>) => {
    try {
      console.log(data);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/staff/${staff?._id}`,
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
        if (setOpen) {
          setOpen(false);
        }

        return;
      }
      return toast.error(json.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    if (update) {
      updateStaffDetail(data);
    } else {
      createNewStaff(data, router);
    }
  };

  return (
    <div className="max-h-[600px] px-6">
      <Form {...form}>
        <h1 className=" text-center text-4xl font-semibold">
          Create New Staff
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
          {!update ? (
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
            </>
          ) : null}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StaffForm;
