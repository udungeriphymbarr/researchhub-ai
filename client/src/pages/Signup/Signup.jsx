import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
       <h1 className="text-3xl font-bold text-center text-blue-600">
            Create Your Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
            Join ResearchHub AI today
        </p>

        <form className="mt-6 space-y-4">

          <div>
            <label className="block mb-1 font-medium">
              Full Name
            </label>

            <input
              type="text"
              required
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
              required
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
              required
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Account
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