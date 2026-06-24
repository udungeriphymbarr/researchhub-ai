import { useState } from "react";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendResetLink = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Enter your email",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://researchhub-api-k9pv.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "Check your inbox for the reset link",
        });

        setEmail("");
      } else {
        Swal.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter your email address
        </p>

        <div className="mt-6">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            onClick={sendResetLink}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;