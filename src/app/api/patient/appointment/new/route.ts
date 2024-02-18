import { FormSchema } from "@/app/dashboard/patient/appointment/utils/schema";
import connectToDB from "@/database/connectToDB";
import { Appointment, TAppointment } from "@/database/modals/Appointment";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("the body is", body);
    if (!body) {
      return new Response(
        JSON.stringify({
          message: "Invalid request",
        }),
        { status: 400 },
      );
    }
    const user = await getUserDetails();

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "You are not logged in",
        }),
        { status: 401 },
      );
    }
    if (user.role !== "patient") {
      return new Response(
        JSON.stringify({
          message: "You are not authorized to create an appointment",
        }),
        { status: 403 },
      );
    }
    console.log(body, "the body is");
    const data = FormSchema.safeParse({
      ...body.data,
      date: new Date(body.data.date),
    });
    if (!data.success) {
      console.log(data.success);
      return new Response(
        JSON.stringify({
          message: data.error.issues,
        }),
        { status: 400 },
      );
    }
    await connectToDB();

    const newAppointment = await Appointment.create<TAppointment>({
      patientId: user.data._id,
      date: data.data.date,
      medicalDepartment: data.data.type,
      contactPreference: data.data.contact,
      status: "pending",
    });
    console.log("the new appointment is", newAppointment);
    return new Response(
      JSON.stringify({
        message: "Appointment created successfully",
        data: newAppointment,
      }),
      { status: 201 },
    );
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: err.message,
      }),
      { status: 500 },
    );
  }
}
