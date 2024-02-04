export const Lipid = [
    {
      name: "Cholesterol Total",
      input:false,
      children: [
        {
          investigation: "Spectrophotometry",
          normalRange: "20-50",
          unit: "mg/dL",
          input: true,
        }
      ]
    },
    {
      name: "Triglycerides",
      input:false,
      children: [
        {
          investigation: "Spectrophotometry",
          result: "5.2",
          normalRange: "5-10",
          unit: "mg/dL",
          input: true,
        },
  
      ]
    },
    {
      name: "HDL Cholesterol",
      input:false,
      children: [
        {
          investigation: "Spectrophotometry",
          result: "5.2",
          normalRange: "5-10",
          unit: "mg/dL",
          input: true,
        },
      ]
    },
    {
      name: "LDL Cholesterol",
      input:false,
      children: [
        {
          investigation: "Calculated",
          result: "60000",
          normalRange: "500000-100000",
          unit: "mg/dL",
          input: true,
        }
      ]
    },
    {
      name: "VLDL Cholesterol",
      input:false,
      children: [
        {
          investigation: "Calculated",
          result: "60",
          normalRange: "50-80",
          unit: "mg/dL",
          input: true,
        }
      ]
    },
    {
      name: "Non-HDL Cholesterol",
      input:false,
      children: [
        {
          investigation: "Calculated",
          result: "6000",
          normalRange: "540000-80000",
          unit: "mg/dL",
          input: true,
        },
      ]
    },
   
  ];
  