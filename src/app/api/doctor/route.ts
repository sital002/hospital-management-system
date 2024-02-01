import connectToDB from "@/database/connectToDB";
import { Doctor } from "@/database/modals/DoctorModel";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string({
    invalid_type_error: "Please enter a valid email",
    required_error: "Email is required",
  }),
  password: z.string({
    invalid_type_error: "Please enter a valid password",
    required_error: "Password is required",
  }),
  cpassword: z.string({
    invalid_type_error: "Please enter a valid Confirm password",
    required_error: "Confirm password is required",
  }),
  department: z.string({
    invalid_type_error: "Please enter a valid department",
    required_error: "Department is required",
  }),

  dob: z.string({
    invalid_type_error: "Please enter a valid dob",
    required_error: "DOB is required",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
    invalid_type_error: "Please enter a valid Gender",
  }),
  phone: z.string({
    invalid_type_error: "Please enter a valid phone",
    required_error: "Phone is required",
  }),
  address: z.string({
    invalid_type_error: "Please enter a valid address",
    required_error: "Address is required",
  }),
});
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      password,
      cpassword,
      department,
      dob,
      gender,
      phone,
      address,
    } = data;
    if (!name)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a name" }),
        { status: 400 },
      );
    if (!email)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a email" }),
        { status: 400 },
      );
    if (!password)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please provide a password",
        }),
        { status: 400 },
      );
    if (!cpassword)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please provide a cpassword",
        }),
        { status: 400 },
      );
    if (!gender)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Gender is required",
        }),
        { status: 400 },
      );
    if (!phone)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a phone" }),
        { status: 400 },
      );
    if (!address)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a address" }),
        { status: 400 },
      );
    if (!department)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please provide a department",
        }),
        { status: 400 },
      );
    if (!dob)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a dob" }),
        { status: 400 },
      );

    if (password !== cpassword)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password and cpassword must be same",
        }),
        { status: 400 },
      );
    if (password.length < 8)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password must be at least 8 characters",
        }),
        { status: 400 },
      );
    if (password.length > 64)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password must be at most 64 characters",
        }),
        { status: 400 },
      );

    const user = await Doctor.findOne({ email });
    if (user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already exists",
        }),
        { status: 400 },
      );
    const newDoctor = await Doctor.create(data);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Doctor created successfully",
        data: newDoctor,
      }),
      { status: 201 },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authToken = req.cookies.get("auth_token")?.value;
    // console.log("the token is", authToken);
    if (!authToken) {
      return new Response("You must be logged in", { status: 401 });
    }
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as {
      name: string;
      role: string;
    };
    if (!decoded) {
      return new Response("You are not authorized", { status: 401 });
    }

    await connectToDB();
    const doctors = await Doctor.find();
    return new Response(JSON.stringify(doctors));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
