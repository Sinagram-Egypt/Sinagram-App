import { refreshSessionInputSchema } from "@repo/api/inputSchemas";
import { type NextRequest } from "next/server";
import * as authService from "@repo/api/authService";

export async function POST(req: NextRequest) {
  try {
    const jsonInput = await req.json();
    const validatedInput = refreshSessionInputSchema.safeParse(jsonInput);

    if (!validatedInput.success) {
      return new Response(
        JSON.stringify({
          status: "error",
          statusCode: 400,
          errors: validatedInput.error.errors,
          detail: "Please make sure all fields are filled out correctly",
        }),
        {
          status: 400,
        },
      );
    }

    try {
      const input = validatedInput.data;

      return new Response(
        JSON.stringify({
          status: "success",
          statusCode: 200,
          data: authService.refreshSession(input.refreshToken),
        }),
        {
          status: 200,
        },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          status: "error",
          statusCode: 401,
          message: "Expired or invalid refresh token",
        }),
        {
          status: 500,
        },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({
        status: "error",
        statusCode: 500,
        message: "Couldn't parse your request, please try again later!",
      }),
      {
        status: 500,
      },
    );
  }
}
