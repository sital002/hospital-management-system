import { Pill } from "lucide-react";
import { BloodTest } from "./bloodtest";

export interface TestCategory {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tests?: any;
}

export const testCategory: TestCategory[] = [
  {
    id: 1,
    name: "Blood Test",
    description: "Blood Test",
    icon: <Pill size={60} />,
    color: "bg-primary",
    tests: BloodTest,
  },
  {
    id: 2,
    name: "Urine Test",
    description: "Urine Test",
    icon: <Pill size={60} />,
    color: "bg-success",
  },
  {
    id: 3,
    name: "X-Ray",
    description: "X-Ray",
    icon: <Pill size={60} />,
    color: "bg-warning",
  },
  {
    id: 4,
    name: "ECG",
    description: "ECG",
    icon: <Pill size={60} />,

    color: "bg-danger",
  },
  {
    id: 5,
    name: "MRI",
    description: "MRI",
    icon: <Pill size={60} />,

    color: "bg-info",
  },
];
