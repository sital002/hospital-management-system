import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req: NextRequest) {
  // console.log(req.cookies);
  // console.log(data);
  const authToken = req.cookies.get("auth_token");
  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  const decoded = jwt.verify(authToken.value, process.env.JWT_SECRET as string);
  console.log(decoded);
  if (!decoded) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.json({
    isAuthenticated: true,
    name: decoded,
  });
}
