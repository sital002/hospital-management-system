<<<<<<< HEAD
import { FormSchema } from "@/app/dashboard/patient/appointment/utils/schema";
import connectToDB from "@/database/connectToDB";
import { Appointment, TAppointment } from "@/database/modals/Appointment";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest } from "next/server";
=======
import { FormSchema } from "@/app/dashboard/patient/appointment/_utils/schema";
import connectToDB from "@/database/connectToDB";
import { Appointment, TAppointment } from "@/database/modals/Appointment";
import { getUserDetails } from "@/utils/Auth";
import { NextRequest, NextResponse } from "next/server";
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711

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
<<<<<<< HEAD
      patientId: user.data._id,
=======
      patient: user.data._id,
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
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
<<<<<<< HEAD
=======

export async function GET() {
  try {
    await connectToDB();
    const appointments = await Appointment.find().populate("patient");
    return NextResponse.json(appointments, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to fetch appointments" },
      { status: 500 },
    );
  }
}
>>>>>>> ace30767d319569e1805d17f7a57370a0aa1d711
