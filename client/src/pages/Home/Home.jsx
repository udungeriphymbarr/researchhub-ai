import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">
          ResearchHub AI
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold max-w-4xl">
          Research Smarter with AI
        </h1>

        <p className="text-gray-600 text-lg mt-6 max-w-2xl">
          Generate research topics, organize projects, manage citations, 
          and get AI-powered academic assistance all in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Start Free
          </Link>

          <Link
            to="/login"
            className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;