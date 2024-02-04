export const arthritis = [
    {
      name: "Serum Uric Acid",
      input:false,
      children: [
        {
          investigation: "Uricase",
          normalRange: "3.50-7.20",
          unit: "mg/dL",
          input: true,
        }
      ]
    },
    {
      name: "Rheumatoid Factor,RA",
      input:false,
      children: [
        {
          investigation: "Immunoturbidimetry",
          result: "5.2",
          normalRange: "0-18",
          unit: "IU/mL",
          input: true,
        },
  
      ]
    },
    {
      name: "C-Reactive Protein,CRP",
      input:false,
      children: [
        {
          investigation: "Immunoturbidimetry",
          result: "5.2",
          normalRange: "0-3",
          unit: "mg/L",
          input: true,
        },
      ]
    },
    {
      name: "Antistreptolysin O,ASO Titer",
      input:false,
      children: [
        {
          investigation: "Immunoturbidimetry",
          result: "60000",
          normalRange: "0-200",
          unit: "IU/mL",
          input: true,
        }
      ]
    },
    {
      name: "iCalcium",
      input:false,
      children: [
        {
          investigation: "Arsenazo III,ISE",
          result: "60",
          normalRange: "1.13-1.33",
          unit: "mmol/L",
          input: true,
        },
        
      ]
    },
    {
      name: "Total Calcium",
      input:false,
      children: [
        {
          investigation: "Arsenazo III",
          result: "6000",
          normalRange: "8.60-10",
          unit: "mg/dL",
          input: true,
        },
      ]
    },
    {
      name: "Serum Phosphorus",
      input:false,
      children: [
        {
          investigation: "Molybdate UV",
          result: "6000",
          normalRange: "2.50-4.50",
          unit: "mg/dL",
          input: true,
        },
      ]
    }
  ];
  