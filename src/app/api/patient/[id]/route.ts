import connectToDB from "@/database/connectToDB";
import { Labtest } from "@/database/modals/Labtest";
import { Patient, PatientType } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";

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
    const patient = (await Patient.findById(id)) as PatientType;
    return new Response(JSON.stringify(patient));
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
    const user = await getUserDetails();
    if (!user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not logged in",
        }),
        { status: 401 },
      );
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
    const deletedUser = await Patient.findByIdAndDelete(id);
    if (deletedUser === null)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Patient not found",
        }),
        { status: 404 },
      );

    await Labtest.deleteMany({ patient: id });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Deleted successfully",
        deletedUser,
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
  const roles = ["staff", "admin", "labtechnician", "patient"];
  try {
    const user = await getUserDetails();
    // console.log(user);

    if (!user)
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not logged in",
        }),
        { status: 401 },
      );
    const id = req.nextUrl.pathname.split("/")[3];
    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );

    const data = await req.json();
    if (!roles.includes(user.role))
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized",
        }),
        { status: 401 },
      );
    // console.log(data);
    if (user.role === "patient" && user.data._id?.toString() !== id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized",
        }),
        { status: 401 },
      );

    await connectToDB();
    const patient = (await Patient.findByIdAndUpdate(id, data)) as PatientType;
    console.log(patient);
    if (!patient)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Patient not found",
        }),
        { status: 404 },
      );
    return new Response(
      JSON.stringify({
        success: true,
        message: "Updated successfully",
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
