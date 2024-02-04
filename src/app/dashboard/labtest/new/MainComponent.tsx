"use client";
import React from "react";
import LabtestForm from "../_component/LabtestForm";
import { PatientType } from "@/database/modals/PatientModel";
import { useSearchParams } from "next/navigation";
import { testCategory } from "../_utils/testCategory";

interface MainComponentProps {
  data: PatientType[];
}
export function MainComponent({ data }: MainComponentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("selectedCategory");
  // console.log(category);
  const selectedCategory = testCategory.find((item) => item.name === category);
  // console.log(selectedCategory);
  const selectedTests = searchParams.get("selectedTests");
  let selectedTestsArray: any[] = [];
  try {
    selectedTestsArray = JSON.parse(selectedTests || "[]");
    console.log(selectedTestsArray);
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <LabtestForm data={data} />
      {selectedCategory?.form}
    </div>
  );
}
