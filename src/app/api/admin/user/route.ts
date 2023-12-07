import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User, { UserType } from "@/database/modals/UserModel";
import connectToDB from "@/database/connectToDB";
export async function GET(req: NextRequest) {
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

  if (true) {
    try {
      await connectToDB();
      const data = (await User.find()) as UserType[];
      if (!data) return new Response("Unauthorized", { status: 401 });
      return NextResponse.json(data);
    } catch (err) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
}

export async function POST(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  // console.log("the token is", authToken);
  if (!authToken) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      { status: 401 },
    );
  }
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as {
    name: string;
    role: string;
  };
  if (!decoded) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      { status: 401 },
    );
  }

  if (decoded.role !== "admin")
    return new Response(
      JSON.stringify({
        success: false,
        message: "You are not admin",
      }),
      { status: 401 },
    );

  try {
    const data = await req.json();
    const {
      name,
      email,
      phone,
      gender,
      password,
      cpassword,
      role,
      dob,
      address,
    } = data;
    if (!name)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name is required",
        }),
        { status: 401 },
      );
    if (!email)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email is required",
        }),
        { status: 401 },
      );
    if (!phone)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Phone is required",
        }),
        { status: 401 },
      );

    if (!gender)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Gender is required",
        }),
        { status: 401 },
      );
    if (!password)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password is required",
        }),
        { status: 401 },
      );

    if (!cpassword)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Confirm Password is required",
        }),
        { status: 401 },
      );
    if (!role)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Role is required",
        }),
        { status: 401 },
      );
    if (!dob)
      return new Response(
        JSON.stringify({
          success: false,
          message: "DOB is required",
        }),
        { status: 401 },
      );
    if (!address)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Address is required",
        }),
        { status: 401 },
      );
    if (password !== cpassword)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password and Confirm Password should be same",
        }),
        { status: 401 },
      );
    if (password.length < 8)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Password should be atleast 8 characters long",
        }),
        { status: 401 },
      );

    if (phone.length !== 10)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Phone should be 10 digits long",
        }),
        { status: 401 },
      );
    await connectToDB();
    const user = (await User.findOne({ email: email })) as UserType;
    if (user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "User already exists",
        }),
        { status: 401 },
      );

    const newUser = await User.create({
      name,
      email,
      phone,
      address,
      gender,
      role,
      password,
      dob,
    });
    console.log("The new user is", newUser);
    if (!newUser) return new Response("Unauthorized", { status: 401 });
    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        user: newUser,
      }),
      { status: 201 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error creating user",
        error: err,
      }),
      { status: 401 },
    );
  }
}
