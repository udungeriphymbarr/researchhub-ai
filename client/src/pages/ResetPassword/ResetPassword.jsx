import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ResetPassword() {

const { token } =
useParams();

const navigate =
useNavigate();

const [password,
setPassword] =
useState("");

const [confirmPassword,
setConfirmPassword] =
useState("");

const [loading,
setLoading] =
useState(false);

const handleReset =
async () => {

if (
  !password ||
  !confirmPassword
) {
  Swal.fire({
    icon: "error",
    title:
      "Fill all fields",
  });

  return;
}

if (
  password !==
  confirmPassword
) {
  Swal.fire({
    icon: "error",
    title:
      "Passwords do not match",
  });

  return;
}

if (
  password.length < 6
) {
  Swal.fire({
    icon: "error",
    title:
      "Password must be at least 6 characters",
  });

  return;
}

try {

  setLoading(true);

  const response =
    await fetch(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify({
            password,
          }),
      }
    );

  const data =
    await response.json();

  if (data.success) {

    Swal.fire({
      icon: "success",
      title:
        "Password Reset Successful",
      text:
        "You can now login",
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } else {

    Swal.fire({
      icon: "error",
      title:
        data.message,
    });

  }

} catch (error) {

  Swal.fire({
    icon: "error",
    title:
      "Something went wrong",
  });

} finally {

  setLoading(false);

}

};

return ( <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

    <h1 className="text-3xl font-bold text-center text-blue-600">
      Reset Password
    </h1>

    <p className="text-center text-gray-500 mt-2">
      Enter a new password
    </p>

    <div className="mt-6 space-y-4">

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="w-full border rounded-lg px-4 py-3"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(
            e.target.value
          )
        }
        className="w-full border rounded-lg px-4 py-3"
      />

      <button
        onClick={
          handleReset
        }
        disabled={
          loading
        }
        className="w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        {loading
          ? "Resetting..."
          : "Reset Password"}
      </button>

    </div>

  </div>

</div>

);
}

export default ResetPassword;
