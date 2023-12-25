import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User, { type UserType } from "@/database/modals/UserModel";
import connectToDB from "@/database/connectToDB";
import {
  Labtechnician,
  LabtechnicianType,
} from "@/database/modals/LabtechnicianModal";
import { Admin, type AdminType } from "@/database/modals/AdminModal";
import { Doctor, type DoctorType } from "@/database/modals/DoctorModel";
import { Staff, type StaffType } from "@/database/modals/StaffModal";

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

type RoleType = "admin" | "doctor" | "labtechnician" | "staff";
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
    const user = (await User.findById(decoded._id)) as UserType;
    if (!user) return false;
    if (user.role !== role) return false;
    console.log("Authorized");
    return true;
  } catch (err) {
    return false;
  }
}

export async function getUserDetails() {
  try {
    const authToken = cookies().get("auth_token");
    if (!authToken) return null;
    const decoded = jwt.verify(
      authToken.value,
      process.env.JWT_SECRET as string,
    ) as {
      _id: string;
      role: "doctor" | "labtechnician" | "admin" | "staff";
    };
    if (!decoded) return null;
    await connectToDB();

    if (decoded.role === "labtechnician") {
      const data = (await Labtechnician.findById(
        decoded._id,
      )) as LabtechnicianType;
      return { data, role: "labtechnician" };
    }
    if (decoded.role === "doctor") {
      const data = (await Doctor.findById(decoded._id)) as DoctorType;
      return { data, role: "doctor" };
    }
    if (decoded.role === "staff") {
      const data = (await Staff.findById(decoded._id)) as StaffType;
      return { data, role: "staff" };
    }
    if (decoded.role === "admin") {
      const data = (await Admin.findById(decoded._id)) as AdminType;
      return { data, role: "admin" };
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
