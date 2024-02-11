import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { TestCategory } from "../_utils/testCategory";

interface LabtestCardProps extends React.HTMLProps<HTMLDivElement> {
  test: TestCategory;
  selectedCategory: TestCategory | null;
}
export default function TestCategoryCard({
  test,
  selectedCategory,
  ref,
  ...rest
}: LabtestCardProps) {
  return (
    <Card
      className={`transition-scale flex max-w-[300px] cursor-pointer flex-col items-center justify-center px-2 py-3 duration-200 hover:scale-105 ${
        selectedCategory?.name === test.name ? " bg-primary text-white" : ""
      }`}
      {...rest}
    >
      <div>{test.icon}</div>
      <h3 className="text-xl font-medium">{test.name}</h3>
    </Card>
  );
}
