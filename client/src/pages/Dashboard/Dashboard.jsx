import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
const navigate = useNavigate();

const [stats, setStats] = useState({
topics: 0,
questions: 0,
outlines: 0,
projects: 0,
});

const user = JSON.parse(
localStorage.getItem("user")
);

useEffect(() => {
fetchStats();
}, []);

const fetchStats = async () => {
try {
const user = JSON.parse(
localStorage.getItem("user")
);

  const response = await fetch(
    `http://localhost:5000/api/generations?userId=${user.id}`
  );

  const data = await response.json();

  if (data.success) {
    const topics =
      data.generations.filter(
        (item) => item.type === "topic"
      ).length;

    const questions =
      data.generations.filter(
        (item) =>
          item.type === "question"
      ).length;

    const outlines =
      data.generations.filter(
        (item) =>
          item.type === "outline"
      ).length;

    setStats({
      topics,
      questions,
      outlines,
      projects: 0,
    });
  }
} catch (error) {
  console.error(error);
}

};

const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

return ( <div className="min-h-screen bg-gray-100 p-8">

  {/* Welcome */}

  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 mb-8 shadow">

    <div className="flex justify-between items-center flex-wrap gap-4">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 opacity-90">
          {user?.name}
        </p>

        <p className="text-sm opacity-80">
          {user?.university ||
            "University not set"}
        </p>

        <p className="text-sm opacity-80">
          {user?.department ||
            "Department not set"}
        </p>
      </div>

      <div className="flex gap-3">

        <Link
          to="/profile"
          className="bg-white text-blue-600 px-5 py-2 rounded-lg font-medium"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>

  </div>

  {/* Stats */}

  <div className="grid md:grid-cols-4 gap-6 mb-8">

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Topics
      </h3>

      <p className="text-3xl font-bold text-blue-600 mt-2">
        {stats.topics}
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Questions
      </h3>

      <p className="text-3xl font-bold text-green-600 mt-2">
        {stats.questions}
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Outlines
      </h3>

      <p className="text-3xl font-bold text-purple-600 mt-2">
        {stats.outlines}
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-gray-500">
        Projects
      </h3>

      <p className="text-3xl font-bold text-orange-600 mt-2">
        {stats.projects}
      </p>
    </div>

  </div>

  {/* Quick Actions */}

  <div className="mb-10">

    <h2 className="text-2xl font-bold mb-5">
      Quick Actions
    </h2>

    <div className="grid md:grid-cols-4 gap-4">

      <Link
        to="/topic-generator"
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg"
      >
        🚀 Generate Topic
      </Link>

      <Link
        to="/research-questions"
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg"
      >
        ❓ Research Questions
      </Link>

      <Link
        to="/literature-review"
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg"
      >
        📚 Literature Review
      </Link>

      <Link
        to="/projects"
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg"
      >
        📁 Projects
      </Link>

    </div>

  </div>

  {/* Research Tools */}

  <h2 className="text-2xl font-bold mb-5">
    Research Tools
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <Link
      to="/problem-statement"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      Problem Statement
    </Link>

    <Link
      to="/objectives"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      Objectives
    </Link>

    <Link
      to="/methodology"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      Methodology
    </Link>

    <Link
      to="/significance"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      Significance
    </Link>

    <Link
      to="/abstract"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      Abstract
    </Link>

    <Link
      to="/chapter-outline"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      Chapter Outline
    </Link>

    <Link
      to="/history"
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
    >
      History
    </Link>

  </div>

</div>

);
}

export default Dashboard;