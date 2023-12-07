import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User, { type UserType } from "@/database/modals/UserModel";
import { use } from "react";
import connectToDB from "@/database/connectToDB";

export function isAuthenticated(): boolean {
  try {
    const authToken = cookies().get("auth_token");
    if (!authToken) return false;
    const decoded = jwt.verify(
      authToken.value,
      process.env.JWT_SECRET as string,
    );
    if (!decoded) return false;
    console.log("Authenticated");
    return true;
  } catch (err) {
    return false;
  }
}

type RoleType = "admin" | "patient" | "hospital" | "staff";
export async function isAuthorized(role: RoleType) {
  try {
    const authToken = cookies().get("auth_token");
    if (!authToken) return false;
    const decoded = jwt.verify(
      authToken.value,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;
    if (!decoded && !decoded) return false;
    await connectToDB();
    const user = (await User.findOne(decoded._id)) as UserType;
    if (!user) return false;
    if (user.role !== role) return false;
    console.log("Authorized");
    return true;
  } catch (err) {
    return false;
  }
}

export async function getUserDetails(): Promise<UserType | null> {
  try {
    const authToken = cookies().get("auth_token");
    if (!authToken) return null;
    const decoded = jwt.verify(
      authToken.value,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;
    if (!decoded) return null;
    await connectToDB();
    const user = await User.findById(decoded._id);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
