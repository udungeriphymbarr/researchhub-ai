import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../api/api";

function Signup() {
const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] =
useState("");

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

if (
  !name ||
  !email ||
  !password ||
  !confirmPassword
) {
  Swal.fire({
    icon: "error",
    title: "Missing Information",
    text: "Please fill all fields",
  });
  return;
}

if (password !== confirmPassword) {
  Swal.fire({
    icon: "error",
    title: "Password Error",
    text: "Passwords do not match",
  });
  return;
}

if (password.length < 6) {
  Swal.fire({
    icon: "error",
    title: "Weak Password",
    text: "Password must be at least 6 characters",
  });
  return;
}

try {
  setLoading(true);

  const response = await fetch(
    `${API}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (data.success) {
    Swal.fire({
      icon: "success",
      title: "Account Created 🎉",
      text: "Welcome to ResearchHub AI",
      confirmButtonColor: "#2563eb",
    });

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: data.message,
    });
  }
} catch (error) {
  console.error(error);

  Swal.fire({
    icon: "error",
    title: "Registration Failed",
    text:
      "An error occurred while creating your account",
  });
} finally {
  setLoading(false);
}

};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

    <h1 className="text-3xl font-bold text-center text-blue-600">
      Create Your Account
    </h1>

    <p className="text-center text-gray-500 mt-2">
      Join ResearchHub AI today
    </p>

    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4"
    >

      <div>
        <label className="block mb-1 font-medium">
          Full Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Enter your Full Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          placeholder="Confirm your password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

    </form>

    <p className="text-center mt-6">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-blue-600 font-semibold"
      >
        Login
      </Link>
    </p>

  </div>

</div>

);
}

export default Signup;