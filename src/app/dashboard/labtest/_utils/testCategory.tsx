import { BrainCircuit, Droplets, GaugeCircle, PersonStanding, Pill, Speech, Theater } from "lucide-react";
import { BloodTest } from "./CBC";
import CBCForm from "../_component/CBCForm";
import LFTForm from "../_component/LFTForm";
import { LFTTest } from "./LFT";
import { KFTTest } from "./KFT";
import KFTForm from "../_component/KFTForm";
import ThyroidForm from "../_component/ThyroidForm";
import { ThyroidTest } from "./Thyroid";
import LipidForm from "../_component/LipidForm";
import { Lipid } from "./Lipid";
import ProteinForm from "../_component/ProteinForm";
import { Protein } from "./Protein";

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
    name: "Complete Blood Count (CBC)",
    description: "Blood Test",
    icon: <Droplets size={60} />,
    color: "bg-primary",
    tests: BloodTest,
    form: <CBCForm />,
  },
  {
    id: 2,
    name: "Liver Function Test (LFT)",
    description: "Urine Test",
    icon: <GaugeCircle size={60} />,
    color: "bg-success",
    tests: LFTTest,
    form: <LFTForm />,
  },
  {
    id: 3,
    name: "Kidney Function Test (KFT)",
    description: "X-Ray",
    icon: <BrainCircuit size={50} />,
    color: "bg-warning",
    tests:KFTTest,
    form: <KFTForm />,
  },
  {
    id: 4,
    name: "Thyroid Function Test (TFT)",
    description: "ECG",
    icon: <Theater size={60} />,
    color: "bg-danger",
    tests:ThyroidTest,
    form: <ThyroidForm />,
  },
  {
    id: 5,
    name: "Lipid Profile",
    description: "MRI",
    icon: <Pill size={60} />,
    form: <LipidForm />,
    color: "bg-info",
    tests:Lipid
  },
  {
    id: 6,
    name: "Protein Fraction",
    description: "MRI",
    icon: <PersonStanding size={60} />,
    form: <ProteinForm />,
    color: "bg-info",
    tests:Protein
  },
];
