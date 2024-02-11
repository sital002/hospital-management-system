import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { TestCategory } from "../_utils/testCategory";
import { CheckCheck, CheckCircle } from "lucide-react";

interface LabtestCardProps extends React.HTMLProps<HTMLDivElement> {
  test: any;
  selectedTests: any;
}
export default function LabtestCard({
  test,
  selectedTests,
  ref,
  ...rest
}: LabtestCardProps) {
  const selected = selectedTests?.some(
    (selectedTest: any) => selectedTest.name === test.name,
  );
  return (
    <Card
      className={`${
        selected ? "bg-primary text-white" : "text-black"
      } transition-scale relative flex max-w-[300px] cursor-pointer flex-col items-center justify-center px-2 py-3  duration-200 hover:scale-105`}
      {...rest}
    >
      {/* <CheckCircle color="green" className="absolute right-2 top-1" /> */}
      {selected ? (
        <CheckCircle color="white" className="absolute right-2 top-1" />
      ) : null}
      <div>{test.icon}</div>
      <h3 className={`text-xl font-medium `}>{test.name}</h3>
    </Card>
  );
}
