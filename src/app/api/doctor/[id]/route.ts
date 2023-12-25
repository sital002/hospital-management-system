<<<<<<< HEAD

import connectToDB from "@/database/connectToDB";
import { Doctor, DoctorType } from "@/database/modals/DoctorModel";
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    try {
        console.log('hello i am from console')

        const id = req.nextUrl.pathname.split("/")[3];

        if (!id)
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "ID is required",
                }),
                { status: 400 },
            );
        connectToDB()

        const doctor = (await Doctor.findById(id)) as DoctorType;
        console.log(doctor)
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

        const data = await req.json();

        const doctor = (await Doctor.findByIdAndUpdate(id, data, {
            new: true,
        })) as DoctorType;
        return new Response(JSON.stringify(doctor));
    } catch (err: any) {
        return new Response(
            JSON.stringify({
                success: false,
                message: err.message,
            }),
        );
    }
=======
import { Doctor } from "@/database/modals/DoctorModel";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return new Response(JSON.stringify({ error: "You are not login" }), {
        status: 401,
      });
    }
    if (user.role !== "admin" && user.role !== "staff") {
      return new Response(JSON.stringify({ error: "You are not authorized" }), {
        status: 401,
      });
    }
    const id = req.nextUrl.pathname.split("/")[3];
    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required" }), {
        status: 400,
      });
    }
    const DeletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!DeletedDoctor) {
      return new Response(JSON.stringify({ error: "Doctor not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({ success: true, message: "Deleted successfully" }),
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message }), {
      status: 500,
    });
  }
>>>>>>> 731e339668bd7ea5a033e6e714eea4805491288f
}
