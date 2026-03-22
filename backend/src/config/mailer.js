import { SMTP_USER, SMTP_PASSWORD } from "./env.js"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
})

export async function sendEmail({ to, subject, html }) {
    const info = await transporter.sendMail({
        from: `<${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    })

    return info
}