import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

 const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-white/90
      backdrop-blur-md
      border-b
      shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ResearchHub AI
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Pricing
          </a>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/projects"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Projects
              </Link>

              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;