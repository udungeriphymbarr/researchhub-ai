const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail Server Ready");
  }
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
const sendVerificationEmail = async (email, token) => {
  try {
    console.log("Sending verification email to:", email);
    const verificationLink = 
    `${process.env.CLIENT_URL}/verify-email/${token}`;


    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
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

    console.log("Email sent successfully");
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