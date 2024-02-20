import { LabtechnicainZodFormSchema } from "@/app/dashboard/labtechnician/_utils/labtechnicianSchema";
import connectToDB from "@/database/connectToDB";
import {
  Labtechnician,
  LabtechnicianType,
} from "@/database/modals/LabtechnicianModal";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";

const allowedRoles = ["admin", "staff"];
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );
    await connectToDB();
    const labtechnician = (await Labtechnician.findById(
      id,
    )) as LabtechnicianType;
    return new Response(JSON.stringify(labtechnician));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];

    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );
    const user = await getUserDetails();
    if (!user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action",
        }),
        { status: 401 },
      );
    if (!allowedRoles.includes(user.role)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action",
        }),
        { status: 401 },
      );
    }
    await connectToDB();
    await Labtechnician.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Deleted successfully",
      }),
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/")[3];
    const user = await getUserDetails();
    console.log("The logged in user data is ", user);
    if (!user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action",
        }),
        { status: 401 },
      );
    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );
    if (user.data._id.toString() !== id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action yo ",
        }),
        { status: 401 },
      );
    }


    const body = await req.json();
    const result = LabtechnicainZodFormSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Form validation failed",
        }),
        { status: 400 },
      );
    }
    await connectToDB();
    const labtechnician = (await Labtechnician.findByIdAndUpdate(id, {
      name: result.data.name,
      password: result.data.password,
      phone: result.data.phone,
      address: result.data.address,
      dob: result.data.dob,
      gender: result.data.gender,
    })) as LabtechnicianType;
    return new Response(JSON.stringify(labtechnician));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
