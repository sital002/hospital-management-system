import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import connectToDB from "@/database/connectToDB";
import User, { type UserType } from "@/database/modals/UserModel";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, password } = data;
    if (!email)
      return NextResponse.json({
        success: false,
        message: "Email is required",
      });
    if (!password)
      return NextResponse.json({
        success: false,
        message: "Password is required",
      });
    await connectToDB();
    const user = (await User.findOne({ email: email }).populate(
      "password",
    )) as UserType;
    if (!user)
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    // console.log(user._id);
    // if (user.role !== "admin")
    //   return NextResponse.json({ message: "You are not admin" });
    if (user.password !== password)
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    const authToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
    );
    cookies().set("auth_token", authToken);
    return NextResponse.json({
      success: true,
      message: "Loggedin successfully",
      user,
      token: authToken,
      redirect: "/dashboard",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
