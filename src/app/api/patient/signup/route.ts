import { patientZodSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import connectToDB from "@/database/connectToDB";
import { Patient } from "@/database/modals/PatientModel";
import { generateToken } from "@/utils/generateToken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("the body is", body);
    if (!body) {
      return new Response(
        JSON.stringify({
          message: "Invalid request",
        }),
        { status: 400 },
      );
    }
    const data = patientZodSchema.safeParse(body);
    // console.log("the data is data", data);
    if (!data.success) {
      return new Response(
        JSON.stringify({
          message: data.error,
        }),
        { status: 400 },
      );
    }
    if (data.data.password !== data.data.cpassword) {
      return new Response(
        JSON.stringify({
          message: "Password and Confirm password does not match",
        }),
        { status: 400 },
      );
    }
    await connectToDB();

    const PatientExists = await Patient.findOne({
      email: data.data.email,
    });
    if (PatientExists) {
      return new Response(
        JSON.stringify({
          message: "Email already exists",
        }),
        { status: 400 },
      );
    }
    const newPatient = await Patient.create({
      name: data.data.name,
      status: "pending",
      email: data.data.email,
      phone: data.data.phone,
      dob: data.data.dob,
      address: data.data.address,
      gender: data.data.gender,
      password: data.data.password,
    });
    console.log("New patient", newPatient._id);
    const token = generateToken({
      _id: newPatient._id.toString(),
      role: "patient",
    });
    cookies().set("auth_token", token, {
      path: "/",
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Account created successfully",
        user: newPatient,
      }),
      { status: 200 },
    );
  } catch (e: any) {
    console.log(e.message);
    new Response(
      JSON.stringify({
        message: e.message,
      }),
      { status: 400 },
    );
  }
}
