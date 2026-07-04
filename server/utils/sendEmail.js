const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generic Email
const sendEmail = async (
  email,
  subject,
  html
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
};

// Verification Email
const sendVerificationEmail = async (
  email,
  token
) => {
  const verificationLink =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your ResearchHub account",
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2>Welcome to ResearchHub 🎉</h2>

        <p>
          Click the button below to verify your account.
        </p>

        <a
          href="${verificationLink}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
            margin-top:20px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top:30px">
          If you didn't create this account,
          ignore this email.
        </p>

      </div>
    `,
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
};