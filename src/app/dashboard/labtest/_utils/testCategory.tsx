import { Pill } from "lucide-react";
import { BloodTest } from "./CBC";
import CBCForm from "../_component/CBCForm";
import LipidProfile from "../_component/LipidProfile";

export interface TestCategory {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tests?: any;
  form: React.ReactNode;
}

export const testCategory: TestCategory[] = [
  {
    id: 1,
    name: "CBC",
    description: "Blood Test",
    icon: <Pill size={60} />,
    color: "bg-primary",
    tests: BloodTest,
    form: <CBCForm />,
  },
  {
    id: 2,
    name: "Urine Test",
    description: "Urine Test",
    icon: <Pill size={60} />,
    color: "bg-success",
    form: <CBCForm />,
  },
  {
    id: 3,
    name: "X-Ray",
    description: "X-Ray",
    icon: <Pill size={60} />,
    color: "bg-warning",
    form: <CBCForm />,
  },
  {
    id: 4,
    name: "ECG",
    description: "ECG",
    icon: <Pill size={60} />,
    color: "bg-danger",
    form: <CBCForm />,
  },
  {
    id: 5,
    name: "LIpid Profile",
    description: "MRI",
    icon: <Pill size={60} />,
    form: <LipidProfile />,
    color: "bg-info",
  },
];
