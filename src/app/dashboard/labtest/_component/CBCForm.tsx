"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BloodTestType } from "../_utils/CBC";

const FormSchema = z.object({
  Hemoglobin: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Hemoglobin is required")
    .optional(),
  RBC: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
  WBC: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
  Platelets: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
  ESR: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
});

const CBCForm = () => {
  const searchParams = useSearchParams();
  const selectedTests = searchParams.get("selectedTests");
  let selectedTestsArray: BloodTestType[] = [];
  try {
    selectedTestsArray = JSON.parse(selectedTests || "[]");
    // console.log(selectedTestsArray);
  } catch (e) {
    console.log(e);
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Hemoglobin: "",
      ESR: "",
      Platelets: "",
      RBC: "",
      WBC: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (data) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investigation</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Ref.Value</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedTestsArray.map((data, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell className={"font-bold uppercase"}>
                      {data.label}
                    </TableCell>
                  </TableRow>
                  {data.children &&
                    data.children.map((child: any, childIndex: number) => (
                      <TableRow key={`${index}-${childIndex}`}>
                        <TableCell className={"uppercase"}>
                          {child.investigation}
                        </TableCell>
                        <TableCell>
                          <div>
                            <FormField
                              control={form.control}
                              name={child.investigation}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className="h-[40px] w-[80px]"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </TableCell>
                        <TableCell>{child.normalRange}</TableCell>
                        <TableCell className="font-bold">
                          {child.unit}
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
};

export default CBCForm;
