"use client";
import React, { useState } from "react";
import { PatientType } from "@/database/modals/PatientModel";
import { useSearchParams } from "next/navigation";
import { testCategory } from "../../_utils/testCategory";
import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";
import { formatDate } from "@/utils/formatDate";
import { PatientCard } from "./PatientCard";
import { LabtestFormType } from "../../_utils/CBC";
import { PrintPreview } from "./PrintPreview";
import { SelectPatient } from "../../_component/SelectPatient";
import { LabtestForm } from "./LabtestForm";

interface MainComponentProps {
  data: PatientType[];
}
export function MainComponent({ data }: MainComponentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("selectedCategory");
  // console.log(category);
  const [printForm, setPrintForm] = React.useState(false);
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
  const componentRef = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <Button variant={"default"} onClick={() => setPrintForm(true)}>
        Print
      </Button>
    );
  }, []);

  const [tests, setTests] = useState<LabtestFormType[]>(selectedTestsArray);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    // console.log(tests);
    try {
      const res = await fetch("/api/labtest/new", {
        method: "POST",
        body: JSON.stringify({
          tests,
          patient: selectedPatient?._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTest = await res.json();
      console.log(newTest);
      setShowPreview(true);
    } catch (e) {
      console.log(e);
    }
  };
  const [selectedPatient, setSelectedPatient] =
    React.useState<PatientType | null>(null);
  return (
    <div>
      <div className="px-4" ref={componentRef}>
        {showPreview && <HospitalDetail />}
        {selectedPatient && <PatientCard patient={selectedPatient} />}
        {showPreview && <PrintPreview tests={tests} />}
      </div>
      {!showPreview && (
        <SelectPatient
          data={data}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      )}
      {/* temp  */}
      {/* {selectedCategory && !showPreview && (
        <selectedCategory.form
          handleSubmit={handleSubmit}
          setTests={setTests}
          tests={tests}
          selectedPatient={selectedPatient}
        />
      )} */}
      {selectedCategory && !showPreview && (
        <LabtestForm
          handleSubmit={handleSubmit}
          setTests={setTests}
          tests={tests}
          selectedPatient={selectedPatient}
        />
      )}
      {showPreview && (
        <ReactToPrint
          content={reactToPrintContent}
          documentTitle="Hospital Management System"
          onAfterPrint={handleAfterPrint}
          onBeforeGetContent={handleOnBeforeGetContent}
          onBeforePrint={handleBeforePrint}
          removeAfterPrint
          trigger={reactToPrintTrigger}
        />
      )}
    </div>
  );
}

function HospitalDetail() {
  return (
    <div className="my-5">
      <h1 className="text-center text-xl font-bold">Chitwan Medical College</h1>
      <p className="my-2 text-center font-medium">Ratnangar-3,Tandi,Chitwan</p>
      <p className="my-2 mr-4 text-end font-semibold">
        Date: {formatDate(new Date())}
      </p>
    </div>
  );
}
