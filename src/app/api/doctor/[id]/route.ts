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
}
