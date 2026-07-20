import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API, { authFetch } from "../../api/api";
import UserCard from "./UserCard";
import {
  FaFolderOpen,
  FaBook,
  FaQuestionCircle,
  FaProjectDiagram,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    topics: 0,
    questions: 0,
    outlines: 0,
    projects: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

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
          topics: projects.filter((p) => p.selectedTopic).length,

          questions: generations.filter((g) => g.type === "question").length,

          outlines: generations.filter((g) => g.type === "outline").length,

          literature: generations.filter((g) => g.type === "literature").length,

          methodology: generations.filter((g) => g.type === "methodology")
            .length,

          abstracts: generations.filter((g) => g.type === "abstract").length,

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
    const confirmLogout = window.confirm("Are you sure you want to logout?");

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
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-32 rounded-2xl bg-gray-300" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Welcome */}

      {/* ===========================
    Hero Dashboard
=========================== */}

      <div
        className="
  relative
  overflow-hidden
  rounded-3xl
  bg-gradient-to-r
  from-blue-700
  via-indigo-700
  to-purple-700
  text-white
  p-8
  mb-10
  shadow-xl
"
      >
        {/* Decorative Blur */}

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-20 -left-16 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* LEFT */}

          <div>
            <p className="uppercase tracking-widest text-sm opacity-80 mb-2">
              ResearchHub AI Workspace
            </p>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Welcome back,
              <br />
              {user?.name}
            </h1>

            <p className="mt-5 max-w-xl text-white/90 leading-7">
              Continue building your research project, generate academic
              content, manage your purchased books, and complete your work
              faster with AI.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {user.plan === "premium" ? (
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                  👑 Premium Active
                </span>
              ) : (
                <Link
                  to="/subscription"
                  className="
            bg-yellow-400
            hover:bg-yellow-300
            text-black
            px-5
            py-2
            rounded-full
            font-semibold
            transition
            "
                >
                  Upgrade to Premium
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
      bg-white/10
      backdrop-blur-md
      rounded-2xl
      p-6
      min-w-[280px]
      border
      border-white/20
      "
          >
            <h3 className="font-semibold text-lg mb-5">Workspace Overview</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Projects</span>

                <span className="font-bold">{stats.projects}</span>
              </div>

              <div className="flex justify-between">
                <span>Topics Generated</span>

                <span className="font-bold">{stats.topics}</span>
              </div>

              <div className="flex justify-between">
                <span>Research Questions</span>

                <span className="font-bold">{stats.questions}</span>
              </div>

              <div className="flex justify-between">
                <span>Chapter Outlines</span>

                <span className="font-bold">{stats.outlines}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserCard />

      {/* ===========================
    Statistics
=========================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">
        {/* Topics */}

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <FaBook size={28} />

            <span className="text-xs opacity-80">Topics</span>
          </div>

          <h2 className="text-4xl font-bold mt-6">{stats.topics}</h2>

          <p className="text-sm mt-2 opacity-80">Research topics generated</p>
        </div>

        {/* Questions */}

        <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between">
            <FaQuestionCircle size={28} />

            <span className="text-xs opacity-80">Questions</span>
          </div>

          <h2 className="text-4xl font-bold mt-6">{stats.questions}</h2>

          <p className="text-sm mt-2 opacity-80">AI research questions</p>
        </div>

        {/* Outlines */}

        <div className="bg-gradient-to-br from-purple-500 to-indigo-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between">
            <BsStars size={28} />

            <span className="text-xs opacity-80">Outlines</span>
          </div>

          <h2 className="text-4xl font-bold mt-6">{stats.outlines}</h2>

          <p className="text-sm mt-2 opacity-80">Chapter outlines created</p>
        </div>

        {/* Projects */}

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between">
            <FaProjectDiagram size={28} />

            <span className="text-xs opacity-80">Projects</span>
          </div>

          <h2 className="text-4xl font-bold mt-6">{stats.projects}</h2>

          <p className="text-sm mt-2 opacity-80">Active research projects</p>
        </div>

        {/* Premium */}

        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between">
            👑
            <span className="text-xs font-semibold">Membership</span>
          </div>

          <h2 className="text-2xl font-bold mt-6">
            {user.plan === "premium" ? "Premium" : "Free"}
          </h2>

          <p className="text-sm mt-2">
            {user.plan === "premium"
              ? "Unlimited AI access"
              : "Upgrade available"}
          </p>
        </div>
      </div>

      {/* ===========================
    AI Workspace
=========================== */}

      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">AI Workspace</h2>

            <p className="text-gray-500 mt-1">
              Create research content faster using AI.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Topic */}

          <Link
            to="/topic-generator"
            className="
      group
      bg-white
      rounded-2xl
      p-6
      shadow
      hover:shadow-xl
      transition
      hover:-translate-y-1
      "
          >
            <div className="text-4xl mb-5">🚀</div>

            <h3 className="font-bold text-xl">Topic Generator</h3>

            <p className="text-gray-500 mt-2">
              Generate unique research topics instantly.
            </p>

            <span className="inline-block mt-6 text-blue-600 font-semibold group-hover:translate-x-1 transition">
              Open →
            </span>
          </Link>

          {/* Questions */}

          <Link
            to="/research-questions"
            className="
      group
      bg-white
      rounded-2xl
      p-6
      shadow
      hover:shadow-xl
      transition
      hover:-translate-y-1
      "
          >
            <div className="text-4xl mb-5">❓</div>

            <h3 className="font-bold text-xl">Research Questions</h3>

            <p className="text-gray-500 mt-2">
              Generate quality research questions.
            </p>

            <span className="inline-block mt-6 text-green-600 font-semibold group-hover:translate-x-1 transition">
              Open →
            </span>
          </Link>

          {/* Literature */}

          <Link
            to="/literature-review"
            className="
      group
      bg-white
      rounded-2xl
      p-6
      shadow
      hover:shadow-xl
      transition
      hover:-translate-y-1
      "
          >
            <div className="text-4xl mb-5">📚</div>

            <h3 className="font-bold text-xl">Literature Review</h3>

            <p className="text-gray-500 mt-2">
              Build your literature review with AI.
            </p>

            <span className="inline-block mt-6 text-purple-600 font-semibold group-hover:translate-x-1 transition">
              Open →
            </span>
          </Link>

          {/* Projects */}

          <Link
            to="/projects"
            className="
      group
      bg-white
      rounded-2xl
      p-6
      shadow
      hover:shadow-xl
      transition
      hover:-translate-y-1
      "
          >
            <div className="text-4xl mb-5">📁</div>

            <h3 className="font-bold text-xl">My Projects</h3>

            <p className="text-gray-500 mt-2">
              Continue working on saved projects.
            </p>

            <span className="inline-block mt-6 text-orange-600 font-semibold group-hover:translate-x-1 transition">
              Open →
            </span>
          </Link>
        </div>
      </div>

      {/* ===========================
    Research Resources
=========================== */}

      <div className="mb-14">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Research Resources</h2>

          <p className="text-gray-500 mt-1">
            Access your purchased books, saved work and AI history.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Store */}

          <Link
            to="/store"
            className="
      bg-gradient-to-br
      from-sky-500
      to-blue-700
      text-white
      rounded-2xl
      p-6
      shadow-lg
      hover:scale-105
      transition
      "
          >
            <div className="text-5xl mb-5">🛒</div>

            <h3 className="text-xl font-bold">Store</h3>

            <p className="mt-2 text-white/90">
              Browse premium books, guides and research resources.
            </p>
          </Link>

          {/* Library */}

          <Link
            to="/library"
            className="
      bg-gradient-to-br
      from-emerald-500
      to-green-700
      text-white
      rounded-2xl
      p-6
      shadow-lg
      hover:scale-105
      transition
      "
          >
            <div className="text-5xl mb-5">📚</div>

            <h3 className="text-xl font-bold">My Library</h3>

            <p className="mt-2 text-white/90">
              Download every book you've purchased.
            </p>
          </Link>

          {/* History */}

          <Link
            to="/history"
            className="
      bg-gradient-to-br
      from-violet-500
      to-purple-700
      text-white
      rounded-2xl
      p-6
      shadow-lg
      hover:scale-105
      transition
      "
          >
            <div className="text-5xl mb-5">🕘</div>

            <h3 className="text-xl font-bold">History</h3>

            <p className="mt-2 text-white/90">
              Review previous AI generations.
            </p>
          </Link>

          {/* Projects */}

          <Link
            to="/projects"
            className="
      bg-gradient-to-br
      from-orange-500
      to-red-600
      text-white
      rounded-2xl
      p-6
      shadow-lg
      hover:scale-105
      transition
      "
          >
            <div className="text-5xl mb-5">📂</div>

            <h3 className="text-xl font-bold">Projects</h3>

            <p className="mt-2 text-white/90">
              Organize and continue your research projects.
            </p>
          </Link>
        </div>
      </div>

      {/* ===========================
    AI Research Toolkit
=========================== */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold">AI Research Toolkit</h2>

        <p className="text-gray-500 mt-2">
          Generate every section of your research project with AI assistance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Link
          to="/problem-statement"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">💡</div>

          <h3 className="font-bold text-xl">Problem Statement</h3>

          <p className="text-gray-500 mt-2">
            Generate a compelling research problem.
          </p>
        </Link>

        <Link
          to="/objectives"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">🎯</div>

          <h3 className="font-bold text-xl">Objectives</h3>

          <p className="text-gray-500 mt-2">
            Create research objectives aligned with your topic.
          </p>
        </Link>

        <Link
          to="/methodology"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">🧪</div>

          <h3 className="font-bold text-xl">Methodology</h3>

          <p className="text-gray-500 mt-2">
            Build a complete research methodology.
          </p>
        </Link>

        <Link
          to="/significance"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">🌍</div>

          <h3 className="font-bold text-xl">Significance</h3>

          <p className="text-gray-500 mt-2">
            Explain the importance of your study.
          </p>
        </Link>

        <Link
          to="/abstract"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">📝</div>

          <h3 className="font-bold text-xl">Abstract</h3>

          <p className="text-gray-500 mt-2">
            Generate a concise academic abstract.
          </p>
        </Link>

        <Link
          to="/chapter-outline"
          className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
        >
          <div className="text-4xl mb-4">📑</div>

          <h3 className="font-bold text-xl">Chapter Outline</h3>

          <p className="text-gray-500 mt-2">
            Produce a complete chapter structure.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
