import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import API from "../../api/api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

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

    if (
      password !== confirmPassword
    ) {
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
        text:
          "Password must be at least 6 characters",
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

      const data =
        await response.json();

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title:
            "Account Created 🎉",
          text:
            "Welcome to ResearchHub AI",
          confirmButtonColor:
            "#2563eb",
        });

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title:
            "Registration Failed",
          text: data.message,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text:
          "Something went wrong while creating your account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Create Your Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join ResearchHub AI today 🚀
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e)=>
                setName(e.target.value)
              }
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="Create a password"
                className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={()=>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword
                  ? <FaEyeSlash/>
                  : <FaEye/>}
              </button>

            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e)=>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm password"
                className="w-full border rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={()=>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showConfirmPassword
                  ? <FaEyeSlash/>
                  : <FaEye/>}
              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;