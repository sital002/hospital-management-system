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

import { PatientType } from "@/database/modals/PatientModel";
import { LabtestFormType } from "../../_utils/CBC";

interface LabtestFormProps {
  selectedPatient: PatientType | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  tests: LabtestFormType[];
  setTests: React.Dispatch<React.SetStateAction<LabtestFormType[]>>;
}
export const LabtestForm = ({
  handleSubmit,
  setTests,
  tests,
}: LabtestFormProps) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            {tests.map((test, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className={"font-bold uppercase"}>
                    {test.name}
                  </TableCell>
                </TableRow>
                {test.children &&
                  test.children.map((child, childIndex: number) => (
                    <TableRow key={`${index}-${childIndex}`}>
                      <TableCell className={"uppercase"}>
                        {child.investigation}
                      </TableCell>
                      <TableCell>
                        <div>
                          <Input
                            className="h-[40px] w-[200px]"
                            name={child.investigation}
                            value={child.result}
                            onChange={(e) => {
                              if (isNaN(Number(e.target.value))) return;
                              setTests((prev) => {
                                const newTests = [...prev];
                                newTests[index].children[childIndex].result =
                                  e.target.value;
                                return newTests;
                              });
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{child.normalRange}</TableCell>
                      <TableCell className="font-bold">{child.unit}</TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Button type="submit" className="my-3 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};
