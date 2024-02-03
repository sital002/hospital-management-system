import { Card } from "@/components/ui/card";
import { Pill } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LabtestCard() {
  return (
    <Link href="/dashboard/labtest/new">
      <Card className="flex max-w-[300px] cursor-pointer flex-col items-center justify-center px-2 py-3">
        <div>
          <Pill size={60} />
        </div>
        <h3 className="text-xl font-medium">Blood Test</h3>
      </Card>
    </Link>
  );
}
