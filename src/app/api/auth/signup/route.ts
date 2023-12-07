import connectToDB from "@/database/connectToDB";
import User, { type UserType } from "@/database/modals/UserModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { name, email, password } = data;
    if (!name)
      return new Response(JSON.stringify({ message: "Name is required" }), {
        status: 400,
      });
    if (!email)
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });

    if (!password)
      return new Response(JSON.stringify({ message: "Password is required" }), {
        status: 400,
      });
    await connectToDB();
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user)
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    const newUser = (await User.create(data)) as UserType;
    const authToken = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string,
    );
    cookies().set("auth_token", authToken);
    return new Response(
      JSON.stringify({
        message: "Account created successfully",
        success: true,
        user: { ...newUser, authToken },
        redirect: "/dashboard",
      }),
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
