import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import exportProjectPDF from "../../utils/exportProjectPDF";

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
      const response = await fetch(`https://researchhub-api-k9pv.onrender.com/api/projects/${id}`);

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
      const response = await fetch(
        `https://researchhub-api-k9pv.onrender.com/api/generations/project/${id}`
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
  <div className="mb-8">

    <h1 className="text-4xl font-bold">
      {project?.title}
    </h1>

    <p className="text-gray-500 mt-2">
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
      className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
    >
      Export PDF
    </button>
  )}

</div>

      {/* Stats */}

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-gray-500">
      Topics
    </h3>

    <p className="text-3xl font-bold text-blue-600 mt-2">
      {topics.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-gray-500">
      Questions
    </h3>

    <p className="text-3xl font-bold text-green-600 mt-2">
      {questions.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-gray-500">
      Outlines
    </h3>

    <p className="text-3xl font-bold text-purple-600 mt-2">
      {outlines.length}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow text-center">
    <h3 className="text-gray-500">
      Total Generations
    </h3>

    <p className="text-3xl font-bold text-orange-600 mt-2">
      {generations.length}
    </p>
  </div>

</div>

      {/* Loading */}

      {loading && (
        <div className="bg-white p-6 rounded-xl shadow">
          Loading...
        </div>
      )}

      {/* Empty State */}

      {!loading &&
  generations.length === 0 && (
    <div className="bg-white p-8 rounded-xl shadow text-center">

      <h2 className="text-xl font-semibold mb-2">
        No Generations Yet
      </h2>

      <p className="text-gray-500">
        Start generating content for this project.
      </p>

    </div>
)}

      {/* History */}

      <div className="space-y-4">

        {generations.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <div className="flex justify-between items-center mb-3">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {item.type}
              </span>

              <p className="text-sm text-gray-500">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>

            </div>

            <p className="font-semibold mb-3">
              {item.input}
            </p>

            <div className="space-y-2">
  {(Array.isArray(item.output)
    ? item.output
    : [item.output]
  ).map((result, index) => (
                <li
                  key={index}
                  className="border rounded-lg p-3"
                >
                    {result}
                  </li>
                )
              )}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProjectDetails;