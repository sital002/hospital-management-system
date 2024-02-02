import {
  Labtechnician,
  LabtechnicianType,
} from "@/database/modals/LabtechnicianModal";
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

    if (!id)
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );

    const data = await req.json();
    const labtechnician = (await Labtechnician.findByIdAndUpdate(
      id,
      data,
      { new: true },
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
