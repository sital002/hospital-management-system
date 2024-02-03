"use client";
import React, { useState } from "react";
import LabtestCard from "./_component/LabtestCard";
import { TestCategory, testCategory } from "./_utils/testCategory";
import TestCategoryCard from "./_component/TestCategoryCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | null>(
    null,
  );
  const [selectedTests, setSelectedTests] = useState<any[]>([]);
  const router = useRouter();
  // console.log(selectedTests);
  const searchParams = new URLSearchParams();
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
      {selectedCategory && (
        <Button
          disabled={selectedTests.length <= 0 ? true : false}
          className="my-4 w-full"
          onClick={() => {
            console.log(selectedCategory.name);
            searchParams.append("selectedCategory", selectedCategory.name);
            searchParams.append("selectedTests", JSON.stringify(selectedTests));
            console.log(searchParams.toString());
            router.push(`/dashboard/labtest/new?${searchParams}`, {});
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
}
