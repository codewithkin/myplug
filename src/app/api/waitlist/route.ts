import { prisma } from "@/helpers/prisma";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.toString().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({error: "Invalid email address"}, {status: 400});
    }

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"MyPlug" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🎉 Thanks for joining the waitlist!",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>You're on the list! 🎉</h2>
          <p>Thanks for signing up to MyPlug. We're thrilled to have you on board.</p>
          <p>We'll keep you posted with updates and let you know as soon as you're invited to try out the platform.</p>
          <p>– The MyPlug Team 🚀</p>
        </div>
      `,
    });

    // Create a waitlist user in the db
    await prisma.waitlistUser.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      {success: true, message: "Confirmation email sent."},
      {status: 200}
    );
  } catch (error) {
    console.error("[WAITLIST_EMAIL_ERROR]", error);
    return NextResponse.json(
      {error: "Something went wrong while sending the email."},
      {status: 500}
    );
  }
}
