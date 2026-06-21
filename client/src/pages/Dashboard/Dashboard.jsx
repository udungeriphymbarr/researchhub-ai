import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  topics: 0,
  questions: 0,
  outlines: 0,
});

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
      const topics = data.generations.filter(
        (item) => item.type === "topic"
      ).length;

      const questions = data.generations.filter(
        (item) => item.type === "question"
      ).length;

      const outlines = data.generations.filter(
        (item) => item.type === "outline"
      ).length;

      setStats({
        topics,
        questions,
        outlines,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  const user = JSON.parse(
  localStorage.getItem("user")
);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            ResearchHub AI
          </h1>
          <p className="text-gray-500">
            Welcome back, {user?.name} 👋
          </p>

          <p className="text-sm text-gray-400">
            {user?.university || "University not set"}
          </p>

          <p className="text-sm text-gray-400">
            {user?.department || "Department not set"}
            {user?.level && ` • ${user.level} Level`}
          </p>
        </div>
      <div className="flex gap-3">

        <Link
          to="/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>
      </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
      Topics Generated
    </h3>

    <p className="text-3xl font-bold text-blue-600 mt-2">
      {stats.topics}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
      Questions Generated
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      {stats.questions}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">
      Outlines Generated
    </h3>

    <p className="text-3xl font-bold text-purple-600 mt-2">
      {stats.outlines}
    </p>
  </div>

</div>

      {/* Dashboard Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/topic-generator"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Topic Generator
          </h2>
          <p className="text-gray-500">
            Generate research topic ideas.
          </p>
        </Link>

        <Link
          to="/research-questions"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Research Questions
          </h2>
          <p className="text-gray-500">
            Generate research questions from a topic.
          </p>
        </Link>

        <Link
          to="/chapter-outline"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Chapter Outline
          </h2>
          <p className="text-gray-500">
            Generate project chapter outlines.
          </p>
        </Link>

        <Link
  to="/history"
  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>
  <h2 className="text-xl font-semibold mb-2">
    Research History
  </h2>

  <p className="text-gray-500">
    View your saved research generations.
  </p>
</Link>

<Link
  to="/profile"
  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>
  <h2 className="text-xl font-semibold mb-2">
    My Profile
  </h2>

  <p className="text-gray-500">
    Manage your account information.
  </p>
</Link>

<Link
  to="/projects"
  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>
  <h2 className="text-xl font-semibold mb-2">
    My Projects
  </h2>

  <p className="text-gray-500">
    Organize all your research work.
  </p>
</Link>

<Link
  to="/problem-statement"
  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>
  <h2 className="text-xl font-semibold mb-2">
    AI Problem Statement
  </h2>

  <p className="text-gray-500">
    Generate academic problem statements.
  </p>
</Link>

<Link
  to="/objectives"
  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
>
  <h2 className="text-xl font-semibold mb-2">
    AI Objectives Generator
  </h2>

  <p className="text-gray-500">
    Generate general and specific objectives.
  </p>
</Link>
      </div>

    </div>
  );
}

export default Dashboard;