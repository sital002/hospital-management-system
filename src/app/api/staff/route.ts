import connectToDB from "@/database/connectToDB";
import { Staff } from "@/database/modals/StaffModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { StaffFormSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = StaffFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Fill all fields",
        },
        {
          status: 400,
        },
      );
    }
    const { data } = result;
    await connectToDB();
    const staff = await Staff.findOne({ email: data.email });
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
