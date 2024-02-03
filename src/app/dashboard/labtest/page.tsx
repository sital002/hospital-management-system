import React from "react";
import LabtestCard from "./_component/LabtestCard";
import CBCForm from "./_component/CBCForm";

export default function page() {
  return (
    <>
    <div className="grid grid-cols-4 gap-2">
      {new Array(10).fill(0).map((_, i) => (
        <LabtestCard key={i} />
      ))}
    </div>
    <CBCForm/>
    </>
  );
}
