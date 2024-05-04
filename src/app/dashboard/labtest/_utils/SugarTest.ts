import { LabtestFormType } from "./CBC";

export const SugarTest:LabtestFormType[] = [
    {
      name: "Fasting Blood Sugar(FBS)",
      input:false,
      children: [
        {
          investigation: "Glucose,Fasting,Plasma",
          normalRange: "70-100",
          unit: "mg/dL",
          input: true,
          result:""
        }
      ]
    },
    {
      name: "Blood Sugar PP(PPBS)",
      input:false,
      children: [
        {
          investigation: "Glucose,Post Prandial,2 Hours,Plasma",
          result: "",
          normalRange: "100-140",
          unit: "mg/dL",
          input: true,
        },
  
      ]
    },
    {
      name: "Random Blod Sugar",
      input:false,
      children: [
        {
          investigation: "Glucose,Random,Plasma",
          result: "",
          normalRange: "70-140",
          unit: "mg/dL",
          input: true,
        },
       
      ]
    },
   
  ];
  