import React, { useState } from "react";
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

import { PatientType } from "@/database/modals/PatientModel";
import { LabtestFormType } from "../_utils/CBC";

interface CBCFormProps {
  selectedPatient: PatientType | null;
  handleSubmit: any;
  tests: LabtestFormType[];
  setTests: React.Dispatch<React.SetStateAction<LabtestFormType[]>>;
}
const CBCForm = ({ handleSubmit, setTests, tests }: CBCFormProps) => {
  const searchParams = useSearchParams();
  const selectedTests = searchParams.get("selectedTests");
  let selectedTestsArray: LabtestFormType[] = [];
  try {
    selectedTestsArray = JSON.parse(selectedTests || "[]");
    // console.log(selectedTestsArray);
  } catch (e) {
    console.log(e);
  }

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
                    {test.label}
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
                            className="h-[40px] w-[80px]"
                            name={child.investigation}
                            value={child.result}
                            onChange={(e) => {
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

export default CBCForm;
