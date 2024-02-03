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

const cbcReportDetails = [
  {
    investigation: "Primary Sample Test",
    result: "Blood",
  },
  {
    investigation: "HEMOGLOBIN",
    upper: true,
  },
  {
    investigation: "Hemoglobin(Hb)",
    result: "10.3",
    ref: "20-30",
    unit: "g/dL",
    input: true,
  },
  {
    investigation: "RBC COUNT",
    upper: true,
  },
  {
    investigation: "Total RBC Count",
    result: "5.2",
    ref: "5-10",
    unit: "mill/cumm",
    input: true,
  },
  {
    investigation: "blood indicces",
    upper: true,
  },
  {
    investigation: "packed cell volume(PCV)",
    result: "5.2",
    ref: "5-10",
    unit: "%",
    input: true,
  },
  {
    investigation: "mean corpuscular volume",
    result: "5.2",
    ref: "5-10",
    unit: "%",
    input: true,
  },
  {
    investigation: "RDW",
    result: "5.2",
    ref: "5-10",
    unit: "%",
    input: true,
  },
  {
    investigation: "wbc count",
    upper: true,
  },
  {
    investigation: "total wbc count",
    result: "60000",
    ref: "500000-100000",
    unit: "cumm",
    input: true,
  },
  {
    investigation: "differential wbc count",
    upper: true,
  },
  {
    investigation: "neutrophils",
    result: "60",
    ref: "50-80",
    unit: "cumm",
    input: true,
  },
  {
    investigation: "lymphocytes",
    result: "60",
    ref: "540-80",
    unit: "cumm",
    input: true,
  },
  {
    investigation: "eosinophils",
    result: "60",
    ref: "540-80",
    unit: "cumm",
    input: true,
  },
  {
    investigation: "monocytes",
    result: "60",
    ref: "540-80",
    unit: "cumm",
    input: true,
  },
  {
    investigation: "basophils",
    result: "60",
    ref: "540-80",
    unit: "cumm",
    input: true,
  },
  {
    investigation: "platelet count",
    upper: true,
  },
  {
    investigation: "total platelet count",
    result: "6000",
    ref: "540000-80000",
    unit: "cumm",
    input: true,
  },
];

const FormSchema = z.object({
  Hemoglobin: z
    .string({
      required_error: "Name is required",
    })
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
  let selectedTestsArray: any[] = [];
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
                <TableRow key={index}>
                  <TableCell className={"font-bold uppercase"}>
                    {data.name}
                  </TableCell>
                  <TableCell>
                    <div>
                      <FormField
                        control={form.control}
                        name={data.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{data.normalRange}</TableCell>
                  <TableCell className="font-bold">{data.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="my-2 mr-3" variant={"destructive"}>
            DELETE
          </Button>
          <Button className="my-2 mr-3" variant={"default"}>
            PRINT
          </Button>
          <Button className="my-2 mr-3 " variant={"outline"}>
            Preview
          </Button>
          <Button className="my-2 mr-3" variant={"default"}>
            SAVE
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CBCForm;
