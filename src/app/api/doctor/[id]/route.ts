import { doctorZodSchema } from "@/app/dashboard/doctor/_utils/doctorSchema";
import connectToDB from "@/database/connectToDB";
import { Doctor, DoctorType } from "@/database/modals/DoctorModel";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("hello i am from console");

    const id = req.nextUrl.pathname.split("/")[3];

    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );
    connectToDB();

    const doctor = (await Doctor.findById(id)) as DoctorType;
    console.log(doctor);
    return new Response(JSON.stringify(doctor));
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

    await Doctor.findByIdAndDelete(id);
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
    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );

    const user = await getUserDetails();
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action",
        }),
        { status: 401 },
      );
    }

    const allowedRoles = ["admin", "doctor"];
    console.log(user, "User is ");
    const body = await req.json();
    const data = doctorZodSchema.safeParse(body);
    // console.log("The data is ", data.success);
    if (!data.success) {
      return new Response(
        JSON.stringify({
          message: "Form validation failed",
        }),
        {
          status: 400,
        },
      );
    }
    const doctor = (await Doctor.findByIdAndUpdate(
      id,
      data.data,
    )) as DoctorType;
    return new Response(JSON.stringify(doctor));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
