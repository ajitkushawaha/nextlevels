import nodemailer from 'nodemailer'

const emailHost = process.env.EMAIL_SERVER || process.env.SMTP_HOST || 'smtp.gmail.com'
const emailPort = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || 465)
const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER || ''
const emailPassword = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD || ''

export function getConfiguredEmailUser() {
  return emailUser
}

export function isEmailConfigured() {
  return Boolean(emailHost && emailPort && emailUser && emailPassword)
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  if (!isEmailConfigured()) {
    throw new Error('Email SMTP environment variables are not configured')
  }

  const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })

  await transporter.sendMail({
    from: `"Next Level Education" <${emailUser}>`,
    to,
    subject,
    html,
    text,
  })
}
