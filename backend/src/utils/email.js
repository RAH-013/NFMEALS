import { transporter } from "../config/mailer.js"
import { verifyEmailTemplate } from "../template/VerifyEmail.js"

async function sendEmail({ to, subject, html }) {
    return transporter.sendMail({
        from: `<${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    })
}

export const sendVerifyEmail = async (user, url) => {
    if (!user || !user.email) {
        const err = new Error("Usuario inválido")
        err.status = 400
        throw err
    }

    const html = verifyEmailTemplate(url)

    await sendEmail({
        to: user.email,
        subject: "Verifica tu correo",
        html
    })

    return true
}