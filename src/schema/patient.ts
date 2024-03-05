import { z } from "zod";

export const AdmitPatientSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
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
    .max(100, "Address is too long"),
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
  admitType: z
    .string({
      required_error: "AdmitType is required",
    })
    .min(1, "AdmitType is required"),
  patientType: z
    .string({
      required_error: "PatientType is required",
    })
    .min(1, "PatientType is required"),
});
