"use client";
import React, { useState } from "react";
import LabtestCard from "./_component/LabtestCard";
import { TestCategory, testCategory } from "./_utils/testCategory";
import TestCategoryCard from "./_component/TestCategoryCard";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | null>(
    null,
  );
  const [selectedTests, setSelectedTests] = useState<any[]>([]);
  console.log(selectedTests);
  return (
    <div className="px-2">
      <h2 className="my-3 text-2xl font-extrabold">Select a Category</h2>
      <div className="grid grid-cols-4 gap-2">
        {testCategory.map((test, i) => (
          <TestCategoryCard
            key={i}
            selectedCategory={selectedCategory}
            test={test}
            onClick={() => {
              setSelectedCategory(test);
              setSelectedTests([]);
            }}
          />
        ))}
      </div>
      {selectedCategory && (
        <div>
          <h2 className="my-3 text-2xl font-extrabold">
            {selectedCategory.name}
            <span className="ml-4 text-lg font-normal">
              ({selectedTests.length} out of{" "}
              {selectedCategory?.tests?.length ?? 0}) selected
            </span>
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {selectedCategory.tests?.map((item: any, index: number) => {
              return (
                <LabtestCard
                  selectedTests={selectedTests}
                  onClick={() => {
                    if (selectedTests.includes(item)) {
                      setSelectedTests(
                        selectedTests.filter((test) => test !== item),
                      );
                      return;
                    }
                    setSelectedTests([...selectedTests, item]);
                  }}
                  key={index}
                  test={{ ...item, icon: selectedCategory.icon }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
