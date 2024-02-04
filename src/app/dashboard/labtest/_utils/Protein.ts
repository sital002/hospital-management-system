export const Protein = [
    {
      name: "Serum Protein",
      input:false,
      children: [
        {
          investigation: "Spectrophotometry",
          normalRange: "20-50",
          unit: "g/dL",
          input: true,
        }
      ]
    },
    {
      name: "Serum Albumin",
      input:false,
      children: [
        {
          investigation: "BCG",
          result: "5.2",
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
          result: "5.2",
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
  