import connectToDB from "@/database/connectToDB";
import { Labtest, LabtestType } from "@/database/modals/Labtest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/")[3];

  if (!id)
    return new Response(
      JSON.stringify({
        success: false,
        message: "ID is required",
      }),
      { status: 400 },
    );
  try {
    await connectToDB();
    const labtest = (await Labtest.findById(id).populate(
      "patient",
    )) as LabtestType;
    return new Response(JSON.stringify(labtest));
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
    );
  }
}
