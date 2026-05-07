import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const subjectOptions = [
  "Job Opportunity",
  "Freelance Project",
  "Collaboration",
  "Technical Question",
  "Just Saying Hi",
] as const;

const contactFormSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  subject: z.enum(subjectOptions),
  message: z.string().trim().min(20),
  website: z.string().trim().max(0).optional(),
});

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    let data: unknown;

    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Please try again.",
        },
        { status: 400 },
      );
    }

    const parsed = contactFormSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data. Please check your fields and try again.",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, website } = parsed.data;

    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? "Suthankanbala2019@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

    const submittedAt = new Intl.DateTimeFormat("en-LK", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Colombo",
    }).format(new Date());

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeSubmittedAt = escapeHtml(submittedAt);

    const html = `
      <div style="margin:0;padding:0;background:#f7f7f5;font-family:Inter,Arial,sans-serif;color:#0a0a0a;">
        <div style="max-width:720px;margin:0 auto;padding:32px 20px;">
          <div style="border:1px solid #e5e5e5;background:#ffffff;padding:28px;border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#6c63ff;font-weight:700;">Portfolio Contact</p>
            <h2 style="margin:0 0 12px;font-size:28px;line-height:1.1;letter-spacing:-0.04em;">New contact form submission</h2>
            <p style="margin:0 0 24px;color:#3d3d3d;line-height:1.6;">A visitor reached out through the portfolio contact page.</p>

            <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5;overflow:hidden;border-radius:12px;">
              <tbody>
                <tr>
                  <th align="left" style="width:170px;padding:12px 14px;border-bottom:1px solid #e5e5e5;background:#f7f7f5;">Name</th>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e5e5;">${safeName}</td>
                </tr>
                <tr>
                  <th align="left" style="width:170px;padding:12px 14px;border-bottom:1px solid #e5e5e5;background:#f7f7f5;">Email</th>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e5e5;">${safeEmail}</td>
                </tr>
                <tr>
                  <th align="left" style="width:170px;padding:12px 14px;border-bottom:1px solid #e5e5e5;background:#f7f7f5;">Subject</th>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e5e5;">${safeSubject}</td>
                </tr>
                <tr>
                  <th align="left" style="width:170px;padding:12px 14px;border-bottom:1px solid #e5e5e5;background:#f7f7f5;">Submitted at</th>
                  <td style="padding:12px 14px;border-bottom:1px solid #e5e5e5;">${safeSubmittedAt}</td>
                </tr>
                <tr>
                  <th align="left" valign="top" style="width:170px;padding:12px 14px;background:#f7f7f5;">Message</th>
                  <td style="padding:12px 14px;line-height:1.65;white-space:normal;">${safeMessage}</td>
                </tr>
              </tbody>
            </table>

            <p style="margin:20px 0 0;font-size:12px;color:#666666;">Reply directly to this email to continue the conversation.</p>
          </div>
        </div>
      </div>
    `;

    const text = [
      "New Contact Form Submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Submitted At: ${submittedAt}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      const mailtoUrl = `mailto:${encodeURIComponent(toEmail)}?${new URLSearchParams({
        subject: `Portfolio Contact: ${subject} (${name})`,
        body: text,
      }).toString()}`;

      return NextResponse.json({
        success: true,
        fallback: "mailto",
        mailtoUrl,
        message: "Email service is not configured, so your email app will open with the message pre-filled.",
      });
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject} (${name})`,
      html,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send message right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
