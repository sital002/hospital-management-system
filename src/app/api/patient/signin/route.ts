import { NextRequest } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
});
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const data = formSchema.safeParse({ email, password });
    console.log(data);
    if (!data.success) {
      return new Response(
        JSON.stringify({
          message: data.error,
        }),
        { status: 400 },
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Logged in successfully",
      }),
      { status: 200 },
    );
  } catch (e: any) {
    new Response(
      JSON.stringify({
        message: e.message,
      }),
      { status: 400 },
    );
  }
}
