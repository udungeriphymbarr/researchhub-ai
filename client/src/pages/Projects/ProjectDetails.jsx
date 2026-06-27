import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import exportProjectPDF from "../../utils/exportProjectPDF";
import API from "../../api/api";
import AIWorkspace from "../../components/project/AIWorkspace";
import GenerationCard from "../../components/project/GenerationCard";

function ProjectDetails() {
  const { id } = useParams();

const [project, setProject] = useState(null);
const [generations, setGenerations] = useState([]);
const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProject();
    fetchGenerations();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${API}/api/projects/${id}`);

      const data = await response.json();

      if (data.success) {
        setProject(data.project);
      }
    } catch (error) {
      console.error(error);
    }
  };

const fetchGenerations = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const response = await fetch(
      `${API}/api/generations/project/${id}?userId=${user.id}`
    );

    const data = await response.json();

    if (data.success) {
      setGenerations(data.generations);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const topics = generations.filter(
    (item) => item.type === "topic"
  );

  const questions = generations.filter(
    (item) => item.type === "question"
  );

  const outlines = generations.filter(
    (item) => item.type === "outline"
  );

  return (
<div className="p-6">
  <div className="bg-white rounded-2xl shadow p-8 mb-8">

    <h1 className="text-4xl font-bold text-gray-900">
      {project?.title}
    </h1>

    <p className="text-gray-500 mt-3 max-w-3xl">
      {project?.description}
    </p>

    {generations.length > 0 && (
      <button
      onClick={() =>
        exportProjectPDF(
          project,
          generations
        )
      }
      className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
    >
      Export PDF
    </button>
  )}

</div>

      {/* Stats */}

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
    <h3 className="text-gray-500">
      Topics
    </h3>

    <p className="text-3xl font-bold text-blue-600 mt-2">
      {topics.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
    <h3 className="text-gray-500">
      Questions
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      {questions.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
    <h3 className="text-gray-500">
      Outlines
    </h3>

    <p className="text-3xl font-bold text-purple-600 mt-2">
      {outlines.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-center">
    <h3 className="text-gray-500">
      Total Generations
    </h3>

    <p className="text-3xl font-bold text-orange-600 mt-2">
      {generations.length}
    </p>
  </div>

</div>

{/* AI Workspace */}

<AIWorkspace
    projectId={id}
    onGenerate={fetchGenerations}
/>

      {/* Loading */}

      {loading && (
        <div className="bg-white rounded-2xl shadow p-10 text-center">

<div className="text-6xl mb-5">
🤖
</div>

<h2 className="text-2xl font-bold">

Nothing Generated Yet

</h2>

<p className="text-gray-500 mt-3">

Use the AI Workspace above to begin generating research content for this project.

</p>

</div>
      )}

      {/* Empty State */}

      {!loading &&
  generations.length === 0 && (
   <div className="bg-white rounded-2xl shadow p-10 text-center">

<div className="text-6xl mb-5">
🤖
</div>

<h2 className="text-2xl font-bold">

Nothing Generated Yet

</h2>

<p className="text-gray-500 mt-3">

Use the AI Workspace above to begin generating research content for this project.

</p>

</div>
)}

      {/* History */}

      <div className="space-y-4">

{generations.map((item) => (

    <GenerationCard
        key={item._id}
        generation={item}
    />

))}

      </div>

    </div>
  );
}

export default ProjectDetails;