import connectToDB from "@/database/connectToDB";
import { Labtest } from "@/database/modals/Labtest";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Route hit");

  if (!data) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }
  try {
    await connectToDB();
    // console.log(data.tests, data.patient);
    const newTest = await Labtest.create({
      test: data.tests,
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
