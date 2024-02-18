import connectToDB from "@/database/connectToDB";
import { Labtest } from "@/database/modals/Labtest";
import { revalidatePath } from "next/cache";

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
      category: data.category,
      patient: data.patient,
    });
    console.log(newTest);
    revalidatePath("/dashboard/labtest/manage");
    return new Response(JSON.stringify(newTest), {
      status: 201,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
