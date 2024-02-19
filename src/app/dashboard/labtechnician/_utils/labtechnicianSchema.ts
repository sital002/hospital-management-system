import { z } from "zod";

export const LabtechnicainZodFormSchema = z
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
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password and Confirm Password must be same",
    path: ["password"],
  });
