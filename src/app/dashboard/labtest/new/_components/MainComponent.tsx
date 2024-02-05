"use client";
import React from "react";
import LabtestForm from "../../_component/LabtestForm";
import { PatientType } from "@/database/modals/PatientModel";
import { useSearchParams } from "next/navigation";
import { testCategory } from "../../_utils/testCategory";
import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";

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
  return (
    <div>
      <LabtestForm data={data} />
      <div className="px-2" ref={componentRef}>
        {selectedCategory?.form}
      </div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
    </div>
  );
}
