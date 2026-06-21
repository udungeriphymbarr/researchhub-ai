import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();

  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenerations();
  }, []);

  const fetchGenerations = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/generations/project/${id}`
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
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <h1 className="text-3xl font-bold mb-2">
        Project Details
      </h1>

      <p className="text-gray-500 mb-8">
        Manage all research generations
        inside this project.
      </p>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Topics
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {topics.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Questions
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {questions.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Outlines
          </h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {outlines.length}
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
              Start generating topics,
              questions or outlines for
              this project.
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

            <ul className="space-y-2">
              {item.output.map(
                (result, index) => (
                  <li
                    key={index}
                    className="border rounded-lg p-3"
                  >
                    {result}
                  </li>
                )
              )}
            </ul>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProjectDetails;