import { LabtestFormType } from "./CBC";

export const Protein:LabtestFormType[] = [
    {
      name: "Serum Protein",
      input:false,
      children: [
        {
          investigation: "Spectrophotometry",
          normalRange: "20-50",
          unit: "g/dL",
          input: true,
          result:""
        }
      ]
    },
    {
      name: "Serum Albumin",
      input:false,
      children: [
        {
          investigation: "BCG",
          result: "",
          normalRange: "5-10",
          unit: "g/dL",
          input: true,
        },
  
      ]
    },
    {
      name: "Serum Globulin",
      input:false,
      children: [
        {
          investigation: "Calculated",
          result: "",
          normalRange: "5-10",
          unit: "g/dL",
          input: true,
        },
      ]
    },
    {
      name: "A/G Ratio",
      input:false,
      children: [
        {
          investigation: "Calculated",
          result: "60000",
          normalRange: "50-100",
          unit: "g/dL",
          input: true,
        }
      ]
    },
    
  ];
  