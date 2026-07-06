const Brevo = require("@getbrevo/brevo");

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

// Generic Email
const sendEmail = async (
  email,
  subject,
  html
) => {
  try {
    console.log("Sending email to:", email);

    const sendSmtpEmail =
      new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "ResearchHub AI",
      email: "researchhubai.ng@gmail.com",
    };

    sendSmtpEmail.to = [
      {
        email,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const result =
      await apiInstance.sendTransacEmail(
        sendSmtpEmail
      );

    console.log("Email Sent Successfully");
    console.log(result.body);

  } catch (error) {

    console.log("EMAIL ERROR");
    console.log(error);

    throw error;
  }
};

// Verification Email
const sendVerificationEmail = async (
  email,
  token
) => {

  const verificationLink =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  return sendEmail(
    email,
    "Verify your ResearchHub Account",
    `
      <div style="font-family:Arial;padding:20px">

        <h2>Welcome to ResearchHub AI 🎉</h2>

        <p>
        Please verify your email address.
        </p>

        <a
          href="${verificationLink}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            border-radius:8px;
            text-decoration:none;
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