import { useState, useEffect } from "react";
import {
Link,
useNavigate,
} from "react-router-dom";

function Navbar() {
const navigate = useNavigate();

const [user, setUser] = useState(null);
const [menuOpen, setMenuOpen] =
useState(false);

useEffect(() => {
const savedUser = JSON.parse(
localStorage.getItem("user")
);

setUser(savedUser);

const handleStorageChange = () => {
  const updatedUser = JSON.parse(
    localStorage.getItem("user")
  );

  setUser(updatedUser);
};

window.addEventListener(
  "storage",
  handleStorageChange
);

return () => {
  window.removeEventListener(
    "storage",
    handleStorageChange
  );
};

}, []);

 const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");

    setTimeout(() => {
    window.location.reload();
  }, 100);
};


return ( <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm"> <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

    {/* Logo */}
    <Link
      to="/"
      className="text-xl md:text-2xl font-bold text-blue-600"
    >
      ResearchHub AI
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-6">

      <Link
        to="/"
        className="text-gray-700 hover:text-blue-600"
      >
        Home
      </Link>

      <a
        href="#features"
        className="text-gray-700 hover:text-blue-600"
      >
        Features
      </a>

      <a
        href="#pricing"
        className="text-gray-700 hover:text-blue-600"
      >
        Pricing
      </a>

      {user ? (
        <>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            className="text-gray-700 hover:text-blue-600"
          >
            Projects
          </Link>

          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </>
      )}
    </div>

    {/* Mobile Hamburger */}
    <button
      className="md:hidden text-2xl"
      onClick={() =>
        setMenuOpen(!menuOpen)
      }
    >
      ☰
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">

      <Link
        to="/"
        onClick={() =>
          setMenuOpen(false)
        }
      >
        Home
      </Link>

      <a
        href="#features"
        onClick={() =>
          setMenuOpen(false)
        }
      >
        Features
      </a>

      <a
        href="#pricing"
        onClick={() =>
          setMenuOpen(false)
        }
      >
        Pricing
      </a>

      {user ? (
        <>
          <Link
            to="/dashboard"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Projects
          </Link>

          <Link
            to="/profile"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() =>
              setMenuOpen(false)
            }
            className="bg-blue-600 text-white py-2 rounded-lg text-center"
          >
            Get Started
          </Link>
        </>
      )}
    </div>
  )}
</nav>

);
}

export default Navbar;
