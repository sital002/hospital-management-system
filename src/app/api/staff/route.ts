import connectToDB from "@/database/connectToDB";
import { Staff } from "@/database/modals/StaffModal";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      dob,
      address,
      gender,
      shift,
      password,
      cpassword,
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
    if (!shift)
      return new Response(
        JSON.stringify({ success: false, message: "Please provide a shift" }),
        { status: 400 },
      );
    if (!gender)
      return new Response(
        JSON.stringify({ success: false, message: "Gender is required" }),
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
    if (password !== cpassword)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password and confirm password must be same",
        }),
        { status: 400 },
      );
    await connectToDB();
    const staff = await Staff.findOne({ email });
    if (staff)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Staff already exists",
        }),
        { status: 400 },
      );
    const newStaff = await Staff.create(data);
    return new Response(JSON.stringify({ success: true, newStaff }));
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
    const staffs = await Staff.find();
    return new Response(JSON.stringify(staffs));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
