import connectToDB from "@/database/connectToDB";
import { Patient } from "@/database/modals/PatientModel";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const { name, phone, dob, address, gender, admitType, patientType } = data;
    if (!name)
      return new Response(
        JSON.stringify({ success: false, message: "Name is required" }),
      );
    if (!phone)
      return new Response(
        JSON.stringify({ success: false, message: "Phone is required" }),
      );
    if (!dob)
      return new Response(
        JSON.stringify({ success: false, message: "DOB is required" }),
      );
    if (!address)
      return new Response(
        JSON.stringify({ success: false, message: "Address is required" }),
      );
    if (!gender)
      return new Response(
        JSON.stringify({ success: false, message: "Gender is required" }),
      );
    if (!admitType)
      return new Response(
        JSON.stringify({ success: false, message: "Admit Type is required" }),
      );
    if (!patientType)
      return new Response(
        JSON.stringify({ success: false, message: "Patient Type is required" }),
      );
    await connectToDB();
    const patient = await Patient.create(data);
    return new Response(JSON.stringify({ success: true, patient }));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
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
    const patients = await Patient.find();
    return new Response(JSON.stringify(patients));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
