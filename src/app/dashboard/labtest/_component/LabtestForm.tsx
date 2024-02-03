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
    <Card className="my-3 px-3 py-4">
      <h2>Patient Name : {patient.name}</h2>
      <h2>Patient Address : {patient.address}</h2>
      <h2 className="uppercase">Patient Type : {patient.patientType}</h2>
      <h2>Date of birth : {patient.dob}</h2>
      <h2 className="uppercase">Admit Type : {patient.admitType}</h2>
      <h2 className="uppercase">Gender : {patient.gender}</h2>
    </Card>
  );
}
