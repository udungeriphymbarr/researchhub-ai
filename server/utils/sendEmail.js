const axios = require("axios");

const sendEmail = async (email, subject, html) => {
  try {
    console.log("Sending email to:", email);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "ResearchHub AI",
          email: "researchhubai.ng@gmail.com",
        },
        to: [
          {
            email,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("✅ Email Sent Successfully");
    console.log(response.data);

  } catch (error) {

    console.log("❌ EMAIL ERROR");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    throw error;
  }
};

const sendVerificationEmail = async (email, token) => {

  const verificationLink =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  return sendEmail(
    email,
    "Verify your ResearchHub Account",
    `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2>Welcome to ResearchHub AI 🎉</h2>

        <p>Please verify your email address.</p>

        <a
          href="${verificationLink}"
          style="
            background:#2563eb;
            color:#fff;
            padding:12px 20px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
          "
        >
          Verify Email
        </a>

      </div>
    `
  );
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
};