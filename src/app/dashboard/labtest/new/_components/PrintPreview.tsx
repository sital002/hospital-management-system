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

import { LabtestFormType } from "../../_utils/CBC";

interface PreviewProps {
  tests: LabtestFormType[];
}
export const PrintPreview = ({ tests }: PreviewProps) => {
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
                    <TableCell>{child.result}</TableCell>
                    <TableCell>{child.normalRange}</TableCell>
                    <TableCell className="font-bold">{child.unit}</TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
