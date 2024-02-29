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
<<<<<<< HEAD
import { Patient, PatientTypePlus } from "@/database/modals/PatientModel";
=======
import { Patient, PatientType } from "@/database/modals/PatientModel";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

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

type RoleType = "admin" | "doctor" | "labtechnician" | "staff" | "patient";
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

interface Doctor {
  role: "doctor";
  data: DoctorType;
}
interface Staff {
  role: "staff";
  data: StaffType;
}
interface Admin {
  role: "admin";
  data: AdminType;
}
interface Labtechnician {
  role: "labtechnician";
  data: LabtechnicianType;
}
interface Patient {
<<<<<<< HEAD
  data: PatientTypePlus;
=======
  data: PatientType;
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
  role: "patient";
}
type User = Doctor | Staff | Admin | Labtechnician | Patient | null;
export async function getUserDetails(): Promise<User> {
  try {
    const authToken = cookies().get("auth_token");
    // console.log("The auth token is ", authToken);
    if (!authToken) return null;
    const decoded = jwt.verify(
      authToken.value,
      process.env.JWT_SECRET as string,
    ) as {
      _id: string;
      role: RoleType;
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
    if (decoded.role === "patient") {
<<<<<<< HEAD
      const data = (await Patient.findById(decoded._id)) as PatientTypePlus;
=======
      const data = (await Patient.findById(decoded._id)) as PatientType;
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
      return { data, role: "patient" };
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
