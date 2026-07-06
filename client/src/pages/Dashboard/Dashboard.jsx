import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API, { authFetch } from "../../api/api";
import UserCard from "./UserCard";

function Dashboard() {
const navigate = useNavigate();
const [loading, setLoading] = useState(true);

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
    setLoading(true);

    // Fetch generations
    const generationResponse = await authFetch("/api/generations");
    const generationData = await generationResponse.json();

    // Fetch projects
    const projectResponse = await authFetch("/api/projects");
    const projectData = await projectResponse.json();

    if (generationData.success && projectData.success) {
      const generations = generationData.generations;
      const projects = projectData.projects;

      setStats({
        topics: projects.filter(
          (p) => p.selectedTopic
        ).length,

        questions: generations.filter(
          (g) => g.type === "question"
        ).length,

        outlines: generations.filter(
          (g) => g.type === "outline"
        ).length,

        literature: generations.filter(
          (g) => g.type === "literature"
        ).length,

        methodology: generations.filter(
          (g) => g.type === "methodology"
        ).length,

        abstracts: generations.filter(
          (g) => g.type === "abstract"
        ).length,

        projects: projects.length,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
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

if (loading) {
  return (
    <div className="min-h-screen p-8 bg-gray-100">

      <div className="animate-pulse">

        <div className="h-32 rounded-3xl bg-gray-300 mb-8"></div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {[1,2,3,4,5].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl bg-gray-300"
            />
          ))}

        </div>

      </div>

    </div>
  );
}

return ( 
<div className="min-h-screen bg-gray-100 p-8">

  {/* Welcome */}

  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 mb-8 shadow">

    <div className="flex justify-between items-center flex-wrap gap-4">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-2 opacity-90">
          {user?.name}

{user.plan === "premium" && (
    <span className="ml-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
        PREMIUM
    </span>
)}
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

{
  user.plan === "premium" ? (
    <button
      disabled
      className="bg-green-600 text-white px-5 py-2 rounded-lg cursor-default"
    >
      👑 Premium Active
    </button>
  ) : (
    <Link
      to="/pricing"
      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
    >
      👑 Upgrade to Premium
    </Link>
  )
}

      </div>

    </div>

  </div>

  {/* Stats */}

 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">

  <UserCard />

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500 mb-2">
      Topics
    </h3>

    <p className="text-4xl font-bold text-blue-600">
      {stats.topics}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500 mb-2">
      Questions
    </h3>

    <p className="text-4xl font-bold text-green-600">
      {stats.questions}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500 mb-2">
      Outlines
    </h3>

    <p className="text-4xl font-bold text-purple-600">
      {stats.outlines}
    </p>
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500 mb-2">
      Projects
    </h3>

    <p className="text-4xl font-bold text-orange-500">
      {stats.projects}
    </p>
  </div>

</div>


  {/* Quick Actions */}

  <div className="mb-10">

    <h2 className="text-2xl font-bold mb-5">
      Quick Actions
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

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