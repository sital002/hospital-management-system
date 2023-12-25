<<<<<<< HEAD

import connectToDB from "@/database/connectToDB";
import { Staff, StaffType } from "@/database/modals/StaffModal";
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

        const staff = (await Staff.findById(id)) as StaffType;
        console.log(staff)
        return new Response(JSON.stringify(staff));
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

        await Staff.findByIdAndDelete(id);
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

        const staff = (await Staff.findByIdAndUpdate(id, data, {
            new: true,
        })) as StaffType;
        return new Response(JSON.stringify(staff));
    } catch (err: any) {
        return new Response(
            JSON.stringify({
                success: false,
                message: err.message,
            }),
        );
    }
=======
import { Staff } from "@/database/modals/StaffModal";
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
    if (user.role !== "admin") {
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
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return new Response(JSON.stringify({ error: "Staff not found" }), {
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
