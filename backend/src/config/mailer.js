import { SMTP_USER, SMTP_PASSWORD } from "./env.js"

import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
})