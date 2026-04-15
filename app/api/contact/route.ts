import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/contact-form-schema";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const smtpSecure =
    process.env.SMTP_SECURE === "true" || smtpPort === 465;

  if (
    !smtpHost ||
    !smtpPort ||
    !smtpUser ||
    !smtpPass ||
    !smtpFromEmail ||
    !contactToEmail
  ) {
    return NextResponse.json(
      { message: "SMTP environment variables are not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const parsedBody = contactFormSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message:
            parsedBody.error.issues[0]?.message || "Please fill the form correctly.",
        },
        { status: 400 }
      );
    }

    const { name, email, message, social } = parsedBody.data;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: smtpFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Social: ${social || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
          <h2 style="margin-bottom:16px;">New portfolio contact submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Social:</strong> ${escapeHtml(social || "Not provided")}</p>
          <div style="margin-top:20px;">
            <p style="margin-bottom:8px;"><strong>Message:</strong></p>
            <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:8px;padding:12px;">
              ${escapeHtml(message)}
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Unable to send email right now. Please try again later." },
      { status: 500 }
    );
  }
}
