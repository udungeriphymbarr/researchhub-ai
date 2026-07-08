const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generic sender
const sendEmail = async (options) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });
};

// ===============================
// Verification Email
// ===============================

const sendVerificationEmail = async (email, verificationUrl) => {
  await sendEmail({
    email,
    subject: "Verify your ResearchHub AI account",
    message: `
      <h2>Welcome to ResearchHub AI 🚀</h2>

      <p>Thank you for signing up.</p>

      <p>Please click the button below to verify your email address.</p>

      <a href="${verificationUrl}"
      style="
      display:inline-block;
      padding:12px 24px;
      background:#2563eb;
      color:white;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
      ">

      Verify Email

      </a>

      <p>If you didn't create this account, please ignore this email.</p>
    `,
  });
};

// ===============================
// Forgot Password Email
// ===============================

const sendResetPasswordEmail = async (email, resetUrl) => {
  await sendEmail({
    email,
    subject: "Reset Your Password",
    message: `
      <h2>Password Reset</h2>

      <p>You requested a password reset.</p>

      <a href="${resetUrl}"
      style="
      display:inline-block;
      padding:12px 24px;
      background:#2563eb;
      color:white;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
      ">

      Reset Password

      </a>

      <p>If you didn't request this, simply ignore this email.</p>
    `,
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
};