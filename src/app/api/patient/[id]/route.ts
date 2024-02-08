import connectToDB from "@/database/connectToDB";
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

    const deletedUser = await Patient.findByIdAndDelete(id);
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
  try {
    const user = await getUserDetails();
    console.log(user);
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
    // console.log(data);

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
