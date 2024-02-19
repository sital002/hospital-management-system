import { patientZodSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import connectToDB from "@/database/connectToDB";
import { Patient } from "@/database/modals/PatientModel";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const body = await req.json();
    const result = patientZodSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.error,
        }),
        { status: 400 },
      );
    }
    const user = await getUserDetails();
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 400 },
      );
    }
    if (user.role !== "patient") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action",
        }),
        { status: 400 },
      );
    }
    if (user.data.status === "pending") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Your account is pending for approval",
        }),
        { status: 400 },
      );
    }
    if (user.data.status === "rejected") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Your account is rejected",
        }),
        { status: 400 },
      );
    }

    if (!id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "ID is required",
        }),
        { status: 400 },
      );
    }
    console.log("The id is", id);

    if (user.data._id.toString() !== id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "You are not authorized to perform this action",
        }),
        { status: 400 },
      );
    }
    await connectToDB();
    const updatedPatient = await Patient.findByIdAndUpdate(id, result.data);
    return new Response(JSON.stringify(updatedPatient), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        status: 500,
      },
    );
  }
}
