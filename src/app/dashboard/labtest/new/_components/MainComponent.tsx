"use client";
import React, { useState } from "react";
import { PatientType } from "@/database/modals/PatientModel";
import { useRouter, useSearchParams } from "next/navigation";
import { testCategory } from "../../_utils/testCategory";
import { PatientCard } from "./PatientCard";
import { LabtestFormType } from "../../_utils/CBC";
import { SelectPatient } from "../../_component/SelectPatient";
import { LabtestForm } from "./LabtestForm";
import { toast } from "react-toastify";

interface MainComponentProps {
  data: PatientType[];
}
export function MainComponent({ data }: MainComponentProps) {
  const searchParams = useSearchParams();
  const [disabled, setDisabled] = useState(false);
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

  const [tests, setTests] = useState<LabtestFormType[]>(selectedTestsArray);
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] =
    React.useState<PatientType | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (!selectedCategory) return;
    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }
    console.log(tests);
    // function validate(cbc: LabtestFormType[]): boolean {}
    function validateLabtestForms(labtestForms: LabtestFormType[]): boolean {
      for (let i = 0; i < labtestForms.length; i++) {
        for (let j = 0; j < labtestForms[i].children.length; j++) {
          if (!labtestForms[i].children[j].result) {
            return false;
          }
        }
      }
      return true;
    }

    if (!validateLabtestForms(tests))
      return toast.error("Please fill all the fields");
    try {
      setDisabled(true);
      // console.log(selectedCategory);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/labtest`,
        {
          method: "POST",
          body: JSON.stringify({
            tests,
            category: selectedCategory?.name,
            patient: selectedPatient?._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.ok) {
        toast.error("Failed to add test");
        return;
      }
      const newTest = await res.json();
      // console.log(newTest);
      router.push(`/dashboard/labtest/${newTest._id}`);
      router.refresh();
      toast.success("Test added successfully");
    } catch (e) {
      console.log(e);
      toast.error("Failed to add test");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="px-2">
      <SelectPatient
        data={data}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
      {selectedPatient && <PatientCard patient={selectedPatient} />}

      {selectedCategory && (
        <LabtestForm
          disabled={disabled}
          handleSubmit={handleSubmit}
          setTests={setTests}
          tests={tests}
          selectedPatient={selectedPatient}
        />
      )}
    </div>
  );
}
