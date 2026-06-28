import { useState } from "react";
import ProjectSelector from "../../components/ProjectSelector";
import API from "../../api/api";

function TopicGenerator() {
  const [course, setCourse] = useState("");
  const [interest, setInterest] = useState("");
  const [projectId, setProjectId] = useState("");

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const generateTopics = async () => {
    if (!projectId) {
      alert("Please select a project first.");
      return;
    }

    if (!course.trim() || !interest.trim()) {
      alert("Please complete all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API}/api/ai/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            type: "topic",
            course,
            prompt: interest,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setTopics(data.output);
      setIsFallback(
        data.aiFallback || false
      );

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (user) {
        await fetch(
          `${API}/api/generations`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              projectId,
              type: "topic",
              input: interest,
              output: data.output,
            }),
          }
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "Failed to generate research topics."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold">
          AI Research Topic Generator
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Generate unique AI-powered
          research topics and save them
          directly into your project.
        </p>

        <div className="bg-white rounded-2xl shadow p-6">

          <ProjectSelector
            projectId={projectId}
            setProjectId={setProjectId}
          />

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Course / Department
            </label>

            <input
              type="text"
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
              placeholder="e.g. Biochemistry"
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div className="mb-6">

            <label className="block font-medium mb-2">
              Area of Interest
            </label>

            <input
              type="text"
              value={interest}
              onChange={(e) =>
                setInterest(e.target.value)
              }
              placeholder="e.g. Food Safety"
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <button
            onClick={generateTopics}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? "Generating Topics..."
              : "Generate Research Topics"}
          </button>

          {isFallback && (
            <div className="mt-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-yellow-700">
              AI is temporarily unavailable.
              Smart fallback suggestions are
              being displayed.
            </div>
          )}

          {topics.length > 0 && (

            <div className="mt-8">

              <h2 className="text-xl font-semibold mb-4">
                Generated Topics
              </h2>

              <div className="space-y-3">

                {topics.map(
                  (topic, index) => (

                    <div
                      key={index}
                      className="bg-gray-50 border rounded-lg p-4 hover:border-blue-500 transition"
                    >
                      {topic}
                    </div>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default TopicGenerator;