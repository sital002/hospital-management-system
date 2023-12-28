import connectToDB from "@/database/connectToDB";
import { Labtechnician } from "@/database/modals/LabtechnicianModal";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, dob, address, gender, password, cpassword } =
      data;
console.log(name,email);
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
    if (!phone)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a phone" }),
        { status: 400 },
      );
    if (!dob)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a dob" }),
        { status: 400 },
      );

    if (!address)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a address" }),
        { status: 400 },
      );

    if (!gender) return;
    new Response(
      JSON.stringify({
        success: false,
        message: "Gender is required",
      }),
      {
        status: 400,
      },
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
    if (password !== cpassword)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password and confirm password must match",
        }),
        { status: 400 },
      );
    await connectToDB();
    const user = await Labtechnician.findOne({ email });
    if (user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Staff already exists",
        }),
        { status: 400 },
      );
    const newLabtechnician = await Labtechnician.create(data);
    return new Response(JSON.stringify({ success: true, newLabtechnician }));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        status: 500,
      },
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
    const labtechnicians = await Labtechnician.find();
    return new Response(JSON.stringify(labtechnicians));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
