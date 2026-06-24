import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";

function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch(
      `${API}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)
    );

    window.location.href = "/dashboard";

      alert("Login Successful 🚀");

      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);

    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center text-blue-600">
          ResearchHub AI
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome back
        </p>

        <form
  onSubmit={handleLogin}
  className="mt-6 space-y-4"
>
          
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

<input
  type="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
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
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
/>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-right mt-2">
  <Link
    to="/forgot-password"
    className="text-blue-600 text-sm"
  >
    Forgot Password?
  </Link>
</div>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;