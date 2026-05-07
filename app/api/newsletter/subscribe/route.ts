import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().trim().email(),
});

export const runtime = "nodejs";

type ResendErrorShape = {
  message?: string;
  name?: string;
};

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as ResendErrorShape).message);
  }

  return "";
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Please try again.",
        },
        { status: 400 },
      );
    }

    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!resendApiKey || !audienceId) {
      return NextResponse.json(
        {
          success: false,
          error: "Newsletter service is not configured yet. Please try again later.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const response = await resend.contacts.create({
      audienceId,
      email: parsed.data.email,
      unsubscribed: false,
    });

    if (response.error) {
      const message = getErrorMessage(response.error);

      if (message.toLowerCase().includes("already")) {
        return NextResponse.json({
          success: true,
          message: "You're already on the list.",
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: message || "Unable to subscribe right now. Please try again shortly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "You're in. I'll send the next dispatch when it is ready.",
    });
  } catch (error) {
    console.error("Newsletter subscribe route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to subscribe right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
