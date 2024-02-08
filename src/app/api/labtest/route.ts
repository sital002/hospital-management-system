import connectToDB from "@/database/connectToDB";
import { Labtest } from "@/database/modals/Labtest";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data) {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }
    await connectToDB();
    // console.log(data.tests, data.patient);
    console.log("Route hit");
    console.log(data);
    const newTest = await Labtest.create({
      test: data.tests,
      category: data.category,
      patient: data.patient,
    });
    console.log(newTest);
    return new Response(JSON.stringify(newTest), {
      status: 201,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();
    const tests = await Labtest.find();
    return new Response(JSON.stringify(tests), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
