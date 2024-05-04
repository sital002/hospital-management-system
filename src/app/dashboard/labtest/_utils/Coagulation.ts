export const CoagulationTest = [
    {
      name: "Bleeding Time(BT)",
      input:false,
      children: [
        {
          investigation: "Ivy's Method",
          normalRange: "3-10",
          unit: "min",
          input: true,
          result:""
        }
      ]
    },
    {
      name: "Clotting Time(CT)",
      input:false,
      children: [
        {
          investigation: "Lee & White",
          result: "",
          normalRange: "2-7",
          unit: "min",
          input: true,
        },
  
      ]
    },
    {
      name: "Prothrombin Time(PT)",
      input:false,
      children: [
        {
          investigation: "Photo Optical Clot Detection",
          result: "",
          normalRange: "10.3-12.8",
          unit: "sec",
          input: true,
        },
      ]
    },
    {
      name: "Activated Partial Thromboplastin Time(APTT)",
      input:false,
      children: [
        {
          investigation: "Activated Partial Thromboplastin Time(APTT)",
          result: "60000",
          normalRange: "25-37",
          unit: "sec",
          input: true,
        }
      ]
    },
   
  ];
  