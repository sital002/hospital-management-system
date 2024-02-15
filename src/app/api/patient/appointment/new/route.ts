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
    return new Response(
      JSON.stringify({
        message: "Invalid request",
      }),
      { status: 400 },
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
