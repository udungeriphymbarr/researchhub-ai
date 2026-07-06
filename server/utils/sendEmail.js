const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
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
    from: `"ResearchHub AI" <researchhubai.ng@gmail.com>`,
    to: email,
    subject,
    html,
  });
};

// Verification Email
const sendVerificationEmail = async (email, token) => {
  try {
    console.log("Sending verification email to:", email);
    const verificationLink = 
    `${process.env.CLIENT_URL}/verify-email/${token}`;

    console.log("Reached sendMail");
    const info = await transporter.sendMail({
      from: `"ResearchHub AI" <researchhubai.ng@gmail.com>`,
      to: email,
      subject: "Verify your ResearchHub account",
      html: `
        <h2>Welcome to ResearchHub</h2>

        <p>Please verify your email.</p>

        <a href="${verificationLink}">
          Verify Email
        </a>
      `,
    });

    console.log("Finished sendMail");
    console.log(info);

  } catch (err) {

    console.log("EMAIL ERROR");
    console.log(err);

    throw err;
  }
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
};