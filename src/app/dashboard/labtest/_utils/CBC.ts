export const BloodTest = [
  {
    name: "Hemoglobin",
    input:false,
    children: [
      {
        investigation: "Hemoglobin(Hb)",
        normalRange: "20-50",
        unit: "g/dgL",
        input: true,
      }
    ]
  },
  {
    name: "RBC Count",
    input:false,
    children: [
      {
        investigation: "Total RBC Count",
        result: "5.2",
        normalRange: "5-10",
        unit: "mill/cumm",
        input: true,
      },

    ]
  },
  {
    name: "Blood Indicces",
    input:false,
    children: [
      {
        investigation: "packed cell volume(PCV)",
        result: "5.2",
        normalRange: "5-10",
        unit: "%",
        input: true,
      },
      {
        investigation: "mean corpuscular volume",
        result: "5.2",
        normalRange: "5-10",
        unit: "%",
        input: true,
      },
      {
        investigation: "RDW",
        result: "5.2",
        normalRange: "5-10",
        unit: "%",
        input: true,
      }
    ]
  },
  {
    name: "WBC",
    input:false,
    children: [
      {
        investigation: "total wbc count",
        result: "60000",
        normalRange: "500000-100000",
        unit: "cumm",
        input: true,
      }
    ]
  },
  {
    name: "differential wbc count",
    input:false,
    children: [
      {
        investigation: "neutrophils",
        result: "60",
        normalRange: "50-80",
        unit: "cumm",
        input: true,
      },
      {
        investigation: "lymphocytes",
        result: "60",
        normalRange: "540-80",
        unit: "cumm",
        input: true,
      },
      {
        investigation: "eosinophils",
        result: "60",
        normalRange: "540-80",
        unit: "cumm",
        input: true,
      },
      {
        investigation: "monocytes",
        result: "60",
        normalRange: "540-80",
        unit: "cumm",
        input: true,
      },
      {
        investigation: "basophils",
        result: "60",
        normalRange: "540-80",
        unit: "cumm",
        input: true,
      },
    ]
  },
  {
    name: "platelet count",
    input:false,
    children: [
      {
        investigation: "total platelet count",
        result: "6000",
        normalRange: "540000-80000",
        unit: "cumm",
        input: true,
      },
    ]
  }
];
