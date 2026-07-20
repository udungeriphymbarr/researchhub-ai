const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ===============================
// Generic Email Sender
// ===============================

const sendEmail = async (options) => {
  await resend.emails.send({
    from: "ResearchHub AI <onboarding@resend.dev>",
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
    subject: "Verify your ResearchHub AI Account",
    message: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px">

        <h2 style="color:#2563eb;">
          Welcome to ResearchHub AI 🚀
        </h2>

        <p>
          Thank you for creating your account.
        </p>

        <p>
          Click the button below to verify your email address.
        </p>

        <a href="${verificationUrl}"
        style="
        display:inline-block;
        padding:14px 28px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:8px;
        font-weight:bold;
        ">

        Verify Email

        </a>

        <p style="margin-top:30px;">
          If you didn't create this account, you can safely ignore this email.
        </p>

      </div>
    `,
  });
};

// ===============================
// Reset Password
// ===============================

const sendResetPasswordEmail = async (email, resetUrl) => {
  await sendEmail({
    email,
    subject: "Reset Your Password",
    message: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px">

      <h2>Password Reset</h2>

      <p>
      Click the button below to reset your password.
      </p>

      <a href="${resetUrl}"
      style="
      display:inline-block;
      padding:14px 28px;
      background:#2563eb;
      color:white;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
      ">

      Reset Password

      </a>

      <p style="margin-top:30px;">
      If you didn't request this, simply ignore this email.
      </p>

      </div>
    `,
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
