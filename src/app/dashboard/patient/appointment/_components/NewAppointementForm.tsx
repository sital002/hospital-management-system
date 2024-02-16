"use client";

import React, { Fragment } from "react";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormSchema } from "../utils/schema";
import { PatientTypePlus } from "@/database/modals/PatientModel";

const medicalDepart = [
  {
    name: "Oncology department",
    value: "oncology",
  },
  {
    name: "Outpatient Department (OPD)",
    value: "outpatient",
  },
  {
    name: "Inpatient Department (IPD)",
    value: "inpatient",
  },
  {
    name: "Neurology department",
    value: "neurology",
  },
  {
    name: "Haematology department",
    value: "haematology",
  },
  {
    name: "Cardiology department",
    value: "cardiology",
  },
  {
    name: "General surgery",
    value: "general",
  },
  {
    name: "Orthopaedic department",
    value: "orthopaedic",
  },
  {
    name: "Opthalmology department",
    value: "opthalmology",
  },
  {
    name: "Gastroenterology department",
    value: "gastroenterology",
  },
  {
    name: "Geriatric department",
    value: "geriatric",
  },
  {
    name: "Gynaecology department",
    value: "gynaecology",
  },
];

interface NewAppointementFormProps {
  patient: PatientTypePlus;
}
export function NewAppointementForm({ patient }: NewAppointementFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patientId: patient._id.toString(),
      date: new Date(),
      contact: "email",
      email: patient.email,
      name: patient.name,
      phone: patient.phone,
      type: "oncology",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    // console.log(data);
    try {
      const res = await axios.post("/api/patient/appointment/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      if (res.status === 201) {
        toast.success("Appointment created successfully.");
        router.push("/dashboard/patient/appointment");
        return router.refresh();
      }
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <h1 className="my-6 text-center text-4xl font-semibold">
          Patient Appointment Form
        </h1>

        <form className=" mt-4  px-10" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="my-4 grid grid-cols-2 gap-x-3">
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+977********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-6 flex">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Contact Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="grid grid-cols-2">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Via Email
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="phone" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Via Phone
                          </FormLabel>
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="my-6 flex">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Which medical department do you want to make an appointment
                    for?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="grid grid-cols-2 gap-y-4">
                        {medicalDepart.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            </Fragment>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="my-3 w-full">
            Schedule
          </Button>
        </form>
      </Form>
    </div>
  );
}
