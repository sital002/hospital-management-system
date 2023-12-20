import { Patient, PatientType } from "@/database/modals/PatientModel";
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
    const id = req.nextUrl.pathname.split("/")[3];

    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );

    await Patient.findByIdAndDelete(id);
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

    const data = await req.json();

    const patient = (await Patient.findByIdAndUpdate(id, data, {
      new: true,
    })) as PatientType;
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
