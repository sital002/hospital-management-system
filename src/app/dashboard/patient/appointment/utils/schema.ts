import { z } from "zod";

export const FormSchema = z.object({
  patientId: z.string({
    required_error: "PatientId is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  phone: z.string({
    required_error: "Phone is required",
    invalid_type_error: "Phone number should be a number.",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid Email",
    }),
  type: z.enum(
    [
      "oncology",
      "gynaecology",
      "geriatric",
      "gastroenterology",
      "opthalmology",
      "orthopaedic",
      "general",
      "cardiology",
      "haematology",
      "neurology",
      "inpatient",
      "outpatient",
    ],
    {
      required_error: "You need to select a department.",
    },
  ),
  contact: z.enum(["email", "phone"], {
    required_error: "You need to select a Contact Preference.",
  }),
  date: z
    .date({
      required_error: "You need to select a date.",
      invalid_type_error: "Invalid Date",
    })
    .min(new Date(), "Invalid Date"),
});
