import { LabtestFormType } from "./CBC";

export const ThyroidTest:LabtestFormType[] = [
    {
      name: "T3,Total,serum",
      input:false,
      children: [
        {
          investigation: "CLIA",
          normalRange: "20-50",
          unit: "U/LL",
          input: true,
          result:""
        }
      ]
    },
    {
      name: "T4,Total,serum",
      input:false,
      children: [
        {
          investigation: "CLIA",
          result: "",
          normalRange: "5-10",
          unit: "U/L",
          input: true,
        },
  
      ]
    },
    {
      name: "TSH",
      input:false,
      children: [
        {
          investigation: "CLIA",
          result: "",
          normalRange: "5-10",
          unit: "U/L",
          input: true,
        },
      ]
    
    },
    {
      name: "Anit-Tg, SERUM",
      input:false,
      children: [
        {
          investigation: "CLIA",
          result: "",
          normalRange: "5-10",
          unit: "U/mL",
          input: true,
        },
      ]
    
    },
    {
      name: "Anit-TPO, SERUM",
      input:false,
      children: [
        {
          investigation: "CLIA",
          result: "",
          normalRange: "5-10",
          unit: "U/mL",
          input: true,
        },
      ]
    
    }
  ];
  