import { useState } from "react";
import { authFetch } from "../../api/api";
import { toast } from "react-toastify";
import SEO from "../../components/SEO";

function ResearchQuestions() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a research topic");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/api/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "research-question",
          prompt: topic,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.output);

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
          await fetch(`${API}/api/generations`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              type: "question",
              input: topic,
              output: data.output,
            }),
          });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to generate research questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Research Questions Generator"
        description="Generate quality research questions for your final year project."
        keywords="research questions, AI research"
      />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-2">
          Research Questions Generator
        </h1>

        <p className="text-gray-500 mb-8">
          Generate AI-powered research questions, hypotheses and objectives.
        </p>

        <div className="bg-white p-6 rounded-xl shadow max-w-3xl">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Research Topic</label>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter research topic"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button
            onClick={generateQuestions}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">AI Result</h2>

              <div className="bg-gray-50 border rounded-xl p-6 whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ResearchQuestions;
