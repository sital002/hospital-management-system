export const SugarTest = [
    {
      name: "Fasting Blood Sugar(FBS)",
      input:false,
      children: [
        {
          investigation: "Glucose,Fasting,Plasma",
          normalRange: "70-100",
          unit: "mg/dL",
          input: true,
        }
      ]
    },
    {
      name: "Blood Sugar PP(PPBS)",
      input:false,
      children: [
        {
          investigation: "Glucose,Post Prandial,2 Hours,Plasma",
          result: "5.2",
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
          result: "5.2",
          normalRange: "70-140",
          unit: "mg/dL",
          input: true,
        },
       
      ]
    },
   
  ];
  