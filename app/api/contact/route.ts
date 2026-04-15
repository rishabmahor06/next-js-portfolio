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
      subject: `New portfolio contact from ${escapeHtml(name)}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Social: ${social || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#e8edf2;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8edf2;padding:30px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Blue Header -->
          <tr>
            <td style="background-color:#1565C0;padding:28px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:64px;vertical-align:middle;">
                    <img src="https://res.cloudinary.com/dvt5vkfwz/image/upload/v1767384721/rishab_portfolio_og_image.png" alt="Rishab Kumar" width="60" height="60" style="border-radius:50%;border:2px solid #ffffff;display:block;object-fit:cover;" />
                  </td>
                  <td style="padding-left:16px;vertical-align:middle;">
                    <p style="margin:0;font-size:20px;font-weight:bold;color:#ffffff;">Rishab Kumar</p>
                    <p style="margin:4px 0 0;font-size:13px;color:#bbdefb;">rishabmahor06@gmail.com</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 16px;">
              <p style="margin:0 0 20px;font-size:16px;color:#333333;">Hi <strong>${escapeHtml(name)}</strong>,</p>

              <p style="margin:0 0 6px;font-size:18px;font-weight:bold;color:#111827;">New Contact Form Submission</p>
              <hr style="border:none;border-top:1px solid #e0e0e0;margin:12px 0 20px;" />

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#666;width:80px;vertical-align:top;"><strong>Name:</strong></td>
                  <td style="padding:6px 0;font-size:14px;color:#333;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#666;vertical-align:top;"><strong>Email:</strong></td>
                  <td style="padding:6px 0;font-size:14px;color:#333;">${escapeHtml(email)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#666;vertical-align:top;"><strong>Social:</strong></td>
                  <td style="padding:6px 0;font-size:14px;color:#333;">${escapeHtml(social || "Not provided")}</td>
                </tr>
              </table>

              <p style="margin:20px 0 8px;font-size:14px;color:#666;"><strong>Message:</strong></p>
              <div style="white-space:pre-wrap;background:#f8f9fa;border:1px solid #e5e7eb;border-radius:8px;padding:16px;font-size:14px;color:#333;line-height:1.6;">
${escapeHtml(message)}
              </div>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:8px 36px 24px;">
              <hr style="border:none;border-top:1px dashed #ccc;margin:0 0 20px;" />
              <p style="margin:0 0 4px;font-size:14px;color:#666;">Best regards,</p>
              <p style="margin:0 0 2px;font-size:17px;font-weight:bold;color:#111;">Rishab Kumar</p>
              <p style="margin:0 0 6px;font-size:13px;color:#888;">Owner | Next.js Portfolio</p>
              <a href="https://github.com/rishabmahor06/next-js-portfolio" style="font-size:13px;color:#1565C0;text-decoration:none;">https://github.com/rishabmahor06/next-js-portfolio</a>
            </td>
          </tr>

          <!-- Social Icons -->
          <tr>
            <td align="center" style="padding:12px 36px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://github.com/rishabmahor06" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="28" height="28" style="display:block;border-radius:50%;" />
                    </a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="https://www.instagram.com/rishab_mahor06/" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="28" height="28" style="display:block;border-radius:50%;" />
                    </a>
                  </td>
                  <td style="padding:0 8px;">
                    <a href="https://www.linkedin.com/in/rishab-kumar-b45890316/" style="text-decoration:none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="28" height="28" style="display:block;border-radius:50%;" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 36px;background-color:#f5f5f5;border-top:1px solid #eee;">
              <p style="margin:0;font-size:11px;color:#999;line-height:1.5;">
                This email was sent to <strong style="color:#666;">${escapeHtml(email)}</strong> &bull; If you have any questions, please feel<br/>free to contact me.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
