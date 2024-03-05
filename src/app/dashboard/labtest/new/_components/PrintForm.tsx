"use client";
import ReactToPrint from "react-to-print";
import React, { forwardRef, ForwardedRef, ButtonHTMLAttributes } from "react";

export function PrintForm() {
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
      <button>
        Print a Functional Component (using `forwardRef`) using a Functional
        Component
      </button>
    ); // eslint-disable-line max-len
  }, []);

  return (
    <div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
      <FunctionalComponentToPrint ref={componentRef} />
    </div>
  );
}

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  // Additional props specific to your button component can be added here
}

// Define the Button component using forwardRef
const FunctionalComponentToPrint = React.forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <div {...props} ref={ref}></div>;
  },
);

FunctionalComponentToPrint.displayName = "FunctionalComponentToPrint";
