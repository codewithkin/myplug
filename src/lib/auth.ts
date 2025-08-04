import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@/generated/prisma"
import { magicLink } from "better-auth/plugins"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, req) => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        const html = `
          <html>
            <head>
              <title>Sign in to MyPlug</title>
              <style>
                body {
                  background-color: #f4f4f5;
                  font-family: Helvetica, Arial, sans-serif;
                  padding: 40px 0;
                }
                .container {
                  max-width: 580px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 40px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                .heading {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 16px;
                }
                .paragraph {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 24px;
                  color: #111827;
                }
                .button {
                  background-color: #3B82F6;
                  color: #ffffff;
                  font-size: 16px;
                  font-weight: 600;
                  padding: 12px 24px;
                  border-radius: 6px;
                  text-decoration: none;
                  display: inline-block;
                  margin-bottom: 24px;
                }
                .subtext {
                  font-size: 14px;
                  color: #6B7280;
                  line-height: 1.5;
                }
                .footer {
                  margin-top: 32px;
                  font-size: 13px;
                  color: #9CA3AF;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="heading">🔌 Welcome back to <span style="color: #3B82F6;">MyPlug</span></div>
                <div class="paragraph">Here's your one-click magic link. It expires in 15 minutes:</div>
                <a class="button" href="${url}">🔐 Sign in to MyPlug</a>
                <div class="subtext">
                  If you didn’t request this, you can safely ignore this email.
                </div>
                <div class="footer">— The MyPlug Team 🚀</div>
              </div>
            </body>
          </html>
        `

        await transporter.sendMail({
          from: `"MyPlug" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your magic link to sign in ✨",
          html,
        })
      },
    }),
  ],
})