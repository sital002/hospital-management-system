import { LabtestFormType } from "./CBC";

export const LFTTest:LabtestFormType[] = [
    {
      name: "AST(SGOT)",
      input:false,
      children: [
        {
          investigation: "IFCC without P5P",
          normalRange: "20-50",
          unit: "U/LL",
          input: true,
          result:""
        }
      ]
    },
    {
      name: "ALT(SGPT)",
      input:false,
      children: [
        {
          investigation: "IFCC without P5P",
          result: "5.2",
          normalRange: "5-10",
          unit: "U/L",
          input: true,
        },
  
      ]
    },
    {
      name: "AST:ALT Ratio",
      input:false,
      children: [
        {
          investigation: "Calculated",
          result: "5.2",
          normalRange: "5-10",
          unit: "U/L",
          input: true,
        },
      ]
    },
    {
      name: "Alkaline Phosphatase(ALP)",
      input:false,
      children: [
        {
          investigation: "IFCC-AMP",
          result: "60000",
          normalRange: "500000-100000",
          unit: "U/L",
          input: true,
        }
      ]
    },
    {
      name: "GGTP",
      input:false,
      children: [
        {
          investigation: "IFCC",
          result: "60",
          normalRange: "50-80",
          unit: "cumm",
          input: true,
        }
      ]
    },
    {
      name: "Bilirubin Total",
      input:false,
      children: [
        {
          investigation: "DPD",
          result: "6000",
          normalRange: "540000-80000",
          unit: "mg/dL",
          input: true,
        },
      ]
    },
    {
      name: "Total Protein",
      input:false,
      children: [
        {
          investigation: "Blure",
          result: "6000",
          normalRange: "540000-80000",
          unit: "g/dL",
          input: true,
        },
      ]
    }
  ];
  