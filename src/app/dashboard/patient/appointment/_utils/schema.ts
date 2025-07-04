import { z } from "zod";

export const AppointmentFormSchema = z.object({
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

export const patientZodSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email("Invalid email address"),
    name: z.string().min(3, "Name cannot be less than 3 characters"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(10, "Phone number cannot be more than 10")
      .refine((value) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
      }, "Invalid phone number"),
    dob: z
      .string({
        required_error: "date is requireds",
      })
      .min(1, "Date is required")
      .refine((value) => {
        const dateRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(value)) return false;
        const [year, month, day] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      }, "Invalid date format or value"),
    address: z.string().min(1, "Address is required"),
    gender: z.enum(["male", "female"], {
      invalid_type_error: "Invalid gender type",
      required_error: "Gender is required",
    }),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long"),
    cpassword: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password and Confirm Password must be same",
    path: ["password"],
  });

export const StaffFormSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .max(60, "Name cannot be more than 100"),
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email("Please enter a valid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password must be less than 64 characters long"),
    cpassword: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Confirm Password must be at least 8 characters long")
      .max(64, "Confirm Password must be less than 64 characters long"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(10, "Phone number cannot be more than 10")
      .refine((value) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
      }, "Invalid phone number"),
    address: z
      .string({
        required_error: "Address is required",
      })
      .min(1, "Address is required")
      .max(100, "Address cannot be more than 100"),
    dob: z
      .string({
        required_error: "date is requireds",
      })
      .min(1, "Date is required")
      .refine((value) => {
        const dateRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
        if (!dateRegex.test(value)) return false;
        const [year, month, day] = value.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      }, "Invalid date format or value"),
    gender: z
      .string({
        required_error: "Gender is required",
      })
      .min(1, "Gender is required"),
    shift: z
      .string({
        required_error: "shift is required",
      })
      .min(1, "Shift is required"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password and Confirm Password must be same",
    path: ["password"],
  });
