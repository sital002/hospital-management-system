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

const CBCForm = () => {
  return (
    <div>
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
          {cbcReportDetails.map((data, index) => (
            <TableRow key={index}>
              <TableCell
                className={data.upper ? "font-bold uppercase" : "capitalize"}
              >
                {data.investigation}
              </TableCell>
              <TableCell>
                {!data.input ? null : (
                  <Input
                    defaultValue={data.result}
                    className="h-[40px] w-[100px] p-1 text-sm"
                  />
                )}
              </TableCell>
              <TableCell>{data.ref}</TableCell>
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
    </div>
  );
};

export default CBCForm;
