import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API, { authFetch } from "../../api/api";
import exportProjectPDF from "../../utils/exportProjectPDF";

import AIWorkspace from "../../components/project/AIWorkspace";
import GenerationCard from "../../components/project/GenerationCard";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshWorkspace();
  }, [id]);

  // -------------------------
  // Fetch Project
  // -------------------------

  const fetchProject = async () => {
    try {
      const response = await authFetch(`/api/projects/${id}`);
      const data = await response.json();

      if (data.success) {
        setProject(data.project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // Fetch Generations
  // -------------------------

  const fetchGenerations = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await authFetch(
        `/api/generations/project/${id}?userId=${user.id}`
      );

      const data = await response.json();

      if (data.success) {
        setGenerations(data.generations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // Refresh Everything
  // -------------------------

  const refreshWorkspace = async () => {
    setLoading(true);

    await Promise.all([
      fetchProject(),
      fetchGenerations(),
    ]);

    setLoading(false);
  };

  // -------------------------
  // Delete Generation
  // -------------------------

  const removeGeneration = (generationId) => {
    setGenerations((prev) =>
      prev.filter((item) => item._id !== generationId)
    );
  };

  // -------------------------
  // Statistics
  // -------------------------

  const topics = generations.filter(
    (item) => item.type === "topic"
  );

  const questions = generations.filter(
    (item) => item.type === "question"
  );

  const objectives = generations.filter(
    (item) => item.type === "objective"
  );

  const literature = generations.filter(
    (item) => item.type === "literature"
  );

  const methodology = generations.filter(
    (item) => item.type === "methodology"
  );

  const abstracts = generations.filter(
    (item) => item.type === "abstract"
  );

  return (
    <div className="p-6">

      {/* ================= Project Header ================= */}

      <div className="bg-white rounded-2xl shadow p-8 mb-8">

        <h1 className="text-4xl font-bold">
          {project?.title}
        </h1>

        <p className="text-gray-500 mt-3">
          {project?.description}
        </p>

        {project?.selectedTopic && (

          <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-5">

            <h2 className="font-bold text-green-700 mb-2">
              🎯 Selected Research Topic
            </h2>

            <p className="text-lg">
              {project.selectedTopic}
            </p>

          </div>

        )}

        {generations.length > 0 && (

          <button
            onClick={() =>
              exportProjectPDF(project, generations)
            }
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Export PDF
          </button>

        )}

      </div>

      {/* ================= Statistics ================= */}

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">

        <StatCard
          title="Topics"
          value={topics.length}
          color="text-blue-600"
        />

        <StatCard
          title="Questions"
          value={questions.length}
          color="text-green-600"
        />

        <StatCard
          title="Objectives"
          value={objectives.length}
          color="text-purple-600"
        />

        <StatCard
          title="Literature"
          value={literature.length}
          color="text-orange-600"
        />

        <StatCard
          title="Methodology"
          value={methodology.length}
          color="text-pink-600"
        />

        <StatCard
          title="Abstract"
          value={abstracts.length}
          color="text-gray-700"
        />

      </div>

      {/* ================= Workspace ================= */}

      <AIWorkspace
        project={project}
        onGenerate={refreshWorkspace}
      />

      {/* ================= Loading ================= */}

      {loading && (

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold">
            Loading...
          </h2>

        </div>

      )}

      {/* ================= Empty ================= */}

      {!loading && generations.length === 0 && (

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <div className="text-6xl">
            🤖
          </div>

          <h2 className="text-2xl font-bold mt-4">
            Nothing Generated Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Use the AI Workspace above to begin generating research content.
          </p>

        </div>

      )}

      {/* ================= History ================= */}

      <div className="space-y-6 mt-8">

        {generations.map((generation) => (

          <GenerationCard
            key={generation._id}
            generation={generation}
            projectId={id}
            onDelete={removeGeneration}
            onTopicSelected={refreshWorkspace}
          />

        ))}

      </div>

    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 text-center">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>

    </div>
  );
}

export default ProjectDetails;