import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

function VerifyEmail() {
  const { token } = useParams();

  const [message, setMessage] =
    useState("Verifying your email...");

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    try {
      const response = await fetch(
        `${API}/api/auth/verify-email/${token}`
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "✅ Email verified successfully. You can now login."
        );
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(
        "Verification failed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">
          Email Verification
        </h1>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default VerifyEmail;