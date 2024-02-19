import connectToDB from "@/database/connectToDB";
import { Doctor } from "@/database/modals/DoctorModel";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { doctorZodSchema } from "@/app/dashboard/doctor/_utils/doctorSchema";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const result = doctorZodSchema.safeParse(data);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          message: "Form validation failed",
        }),
        {
          status: 400,
        },
      );
    }
    const user = await Doctor.findOne({ email: result.data.email });
    if (user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already exists",
        }),
        { status: 400 },
      );
    const newDoctor = await Doctor.create(result.data);
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
