import connectToDB from "@/database/connectToDB";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  await connectToDB();
  if (cookies().get("token")?.value === data.email + data.password) {
    return NextResponse.json({
      message: "Loggedin successfully",
      redirect: "/dashboard",
    });
  }
  cookies().set("token", data.email + data.password);
  return NextResponse.json({ message: "Sign in", data });
}
