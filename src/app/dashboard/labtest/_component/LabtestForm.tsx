"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PatientType } from "@/database/modals/PatientModel";
import { SelectPatient } from "./SelectPatient";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const formSchema = z.object({
  patientId: z
    .string({
      required_error: "Patient is required.",
    })
    .min(1, "PatientID is required."),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}
export default function LabtestForm({ data }: { data: PatientType[] }) {
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
    },
  });
  return (
    <div className="px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select a Patient</FormLabel>
                <FormControl>
                  <div>
                    <SelectPatient
                      {...field}
                      data={data}
                      selectedPatient={selectedPatient}
                      setSelectedPatient={setSelectedPatient}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedPatient && <PatientCard patient={selectedPatient} />}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

function PatientCard({ patient }: { patient: PatientType }) {
  return (
    <Card className="my-3 px-3 py-4 w-1/2">
     <div className="flex my-4 gap-x-20">
     <h2><span className="font-bold">Patient Name :</span>  {patient.name}</h2>
      <h2><span className="font-bold">Patient Address :</span> {patient.address}</h2>
     </div>
      <div className="flex my-4 gap-x-20">
      <h2 className="uppercase"><span className="font-bold">Patient Type :</span> {patient.patientType}</h2>
      <h2><span className="font-bold">Date of birth :</span> {patient.dob}</h2>
      </div>
      <div className="flex my-4 gap-x-20">
      <h2 className="uppercase"><span className="font-bold">Admit Type :</span> {patient.admitType}</h2>
      <h2 className="uppercase"><span className="font-bold">Gender :</span> {patient.gender}</h2>
      </div>
    </Card>
  );
}
