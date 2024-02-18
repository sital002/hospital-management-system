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
    .min(new Date(), "Invalid Date")
    .refine((date) => {
      return date > new Date();
    }, "Date should be in the future"),
});

export const patientZodSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),
  name: z.string().min(3, "Name cannot be less than 3 characters"),
  phone: z.string().min(10, "Phone number cannot be less than 10 characters"),
  dob: z.string().min(1, "DOB is required"),
  address: z.string().min(1, "Address is required"),
  gender: z.enum(["male", "female"]),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
  cpassword: z.string().min(8, "Password must be at least 8 characters long"),
});
