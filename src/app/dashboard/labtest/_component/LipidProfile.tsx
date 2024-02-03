import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Input } from '@/components/ui/input';

const cbcReportDetails=[
    {
        investigation:"cholesterol total",
        upper:true
    },
    {
        investigation:"spectrophotometry",
        result:'250',
        ref:"<200>",
        unit:"mg/dL",
        input:true
    },
    {
        investigation:"triglycerides",
        upper:true
    },
    {
        investigation:"spectrophotometry",
        result:'250',
        ref:"<200>",
        unit:"mg/dL",
        input:true
    },
    {
        investigation:"hdl cholesterol",
        upper:true
    },
    {
        investigation:"spectrophotometry",
        result:'250',
        ref:"<200>",
        unit:"mg/dL",
        input:true
    },
  ]

const LipidProfile = () => {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investigation</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Ref.Value</TableHead>
              <TableHead >Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cbcReportDetails.map((data,index) => (
              <TableRow key={index}>
                <TableCell className={data.upper ? "font-bold uppercase":"capitalize"} >{data.investigation}</TableCell>
               {!data.input ? null : <Input defaultValue={data.result} className='w-[100px] text-sm p-1 h-[40px]'/>}
                <TableCell>{data.ref}</TableCell>
                <TableCell className='font-bold'>{data.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
}

export default LipidProfile