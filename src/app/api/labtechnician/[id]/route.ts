import { LabtechnicainZodFormSchema } from "@/app/dashboard/labtechnician/_utils/labtechnicianSchema";
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
