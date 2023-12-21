import connectToDB from "@/database/connectToDB";
import {
  Labtechnician,
  LabtechnicianType,
} from "@/database/modals/LabtechnicianModal";
import { generateToken } from "@/utils/generateToken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        { status: 400 },
      );
    await connectToDB();
    const user = (await Labtechnician.findOne({ email })).select(
      "+password",
    ) as LabtechnicianType;
    if (!user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email or password",
        }),
        { status: 404 },
      );
    if (user.password !== password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email or password",
        }),
        { status: 400 },
      );
    }
    const token = generateToken({
      _id: user._id.toString(),
      role: "labtechnician",
    });
    cookies().set("auth_token", token, {
      httpOnly: true,
      path: "/",
      secure: true,
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Logged in successfully",
        token,
        user,
      }),
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error?.message,
      }),
    );
  }
}
