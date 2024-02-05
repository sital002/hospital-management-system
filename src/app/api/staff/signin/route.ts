import connectToDB from "@/database/connectToDB";
import { Staff, StaffType } from "@/database/modals/StaffModal";
import { generateToken } from "@/utils/generateToken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Request", req);
    const { email, password } = await req.json();
    console.log(email);
    if (!email || !password)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and password are required",
        }),
        { status: 400 },
      );
    await connectToDB();

    const user = (await Staff.findOne({ email })) as StaffType;
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
      role: "staff",
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
