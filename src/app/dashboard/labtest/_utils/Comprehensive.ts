export const Comprehensive = [
    {
      name: "Glucose,Fasting",
      input:false,
      children: [
        {
          investigation: "Hexokinase",
          normalRange: "70-99",
          unit: "mg/dL",
          input: true,
          result:""
        }
      ]
    },
    {
      name: "Bun",
      input:false,
      children: [
        {
          investigation: "Urease UV",
          result: "",
          normalRange: "7-20",
          unit: "mg/dL",
          input: true,
        },
  
      ]
    },
    {
      name: "Creatinine",
      input:false,
      children: [
        {
          investigation: "Modified Jaffe,Kinetic",
          result: "",
          normalRange: "0.60-1.30",
          unit: "mg/dL",
          input: true,
        },
      ]
    },
    {
      name: "Albumin",
      input:false,
      children: [
        {
          investigation: "BCG",
          result: "60000",
          normalRange: "3.20-4.80",
          unit: "g/dL",
          input: true,
        }
      ]
    },
    {
      name: "GFR",
      input:false,
      children: [
        {
          investigation: "GFR",
          result: "60000",
          normalRange: ">60",
          unit: "mL/min/1.73 m^2",
          input: true,
        }
      ]
    },
    {
      name: "Potassium",
      input:false,
      children: [
        {
          investigation: "Indirect ISE",
          result: "60000",
          normalRange: "3.50-5",
          unit: "mmol/L",
          input: true,
        }
      ]
    },
    
  ];
  