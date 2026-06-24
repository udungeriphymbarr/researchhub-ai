import { useState } from "react";

function TopicGenerator() {
  const [course, setCourse] = useState("");
  const [interest, setInterest] = useState("");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const generateTopics = async () => {
    if (!course || !interest) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://researchhub-api-k9pv.onrender.com/api/ai/topics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course,
            interest,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTopics(data.topics);
        setIsFallback(data.aiFallback || false);

        // Save generation to MongoDB
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (user) {
          await fetch(
            "https://researchhub-api-k9pv.onrender.com/api/generations",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              userId: user.id,
              type: "topic",
              input: interest,
              output: data.topics,
            }),
            }
          );
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate topics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">
        AI Research Topic Generator
      </h1>

      <p className="text-gray-500 mb-8">
        Generate research project topics using AI.
      </p>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        
        {/* Course */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Course / Department
          </label>

          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g. Biochemistry"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Interest */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Area of Interest
          </label>

          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="e.g. Food Safety"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateTopics}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Generating..."
            : "Generate Topics"}
        </button>

        {/* Fallback Message */}
        {isFallback && (
          <div className="mt-6 bg-yellow-100 border border-yellow-300 text-yellow-700 p-4 rounded-lg">
            AI service is currently unavailable.
            Showing smart fallback suggestions.
          </div>
        )}

        {/* Results */}
        {topics.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Generated Topics
            </h2>

            <ul className="space-y-3">
              {topics.map((topic, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg border"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopicGenerator;