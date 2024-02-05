export const KFTTest = [
    {
      name: "Urea",
      input:false,
      children: [
        {
          investigation: "Urease UV",
          normalRange: "20-50",
          unit: "mg/dL",
          input: true,
        }
      ]
    },
    {
      name: "Creatinine",
      input:false,
      children: [
        {
          investigation: "IMordified Jaffe,Kinetic",
          result: "5.2",
          normalRange: "5-10",
          unit: "mg/dL",
          input: true,
        },
  
      ]
    },
    {
      name: "Uric Acid",
      input:false,
      children: [
        {
          investigation: "Uricase",
          result: "5.2",
          normalRange: "5-10",
          unit: "U/L",
          input: true,
        },
      ]
    },
    {
      name: "Calcium,Total",
      input:false,
      children: [
        {
          investigation: "Arsenazo III",
          result: "60000",
          normalRange: "500000-100000",
          unit: "U/L",
          input: true,
        }
      ]
    },
    {
      name: "Phosphorus",
      input:false,
      children: [
        {
          investigation: "Molybdate UV",
          result: "60",
          normalRange: "50-80",
          unit: "cumm",
          input: true,
        }
      ]
    },
    {
      name: "Sodium",
      input:false,
      children: [
        {
          investigation: "Indirect ISE",
          result: "6000",
          normalRange: "540000-80000",
          unit: "mEq/L",
          input: true,
        },
      ]
    },
    {
      name: "Chloride",
      input:false,
      children: [
        {
          investigation: "Indirect ISE",
          result: "6000",
          normalRange: "540000-80000",
          unit: "mEq/L",
          input: true,
        },
      ]
    }
  ];
  