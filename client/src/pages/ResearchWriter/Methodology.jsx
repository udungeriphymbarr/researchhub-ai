import { useState } from "react";
import API from "../../api/api";

function Methodology() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateMethodology = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/api/research/methodology`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setContent(data.content);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate methodology");
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    alert("Copied successfully!");
  };

  const saveToHistory = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await fetch(
        `${API}/api/research/generations`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
body: JSON.stringify({
  userId: user.id,
  projectId: user.projectId,
  type: "methodology",
  input: topic,
  output: [content],
}),
        }
      );

      alert("Methodology saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save methodology");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-2">
        AI Methodology Generator
      </h1>

      <p className="text-gray-500 mb-8">
        Generate research methodology from your topic.
      </p>

      <div className="bg-white p-6 rounded-xl shadow max-w-4xl">

        <label className="block mb-2 font-medium">
          Research Topic
        </label>

        <input
          type="text"
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
          placeholder="Enter research topic"
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <button
          onClick={generateMethodology}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Generating..."
            : "Generate Methodology"}
        </button>

      </div>

      {content && (
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-semibold">
              Generated Methodology
            </h2>

            <div className="flex gap-2">

              <button
                onClick={copyContent}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Copy
              </button>

              <button
                onClick={saveToHistory}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Save
              </button>

            </div>

          </div>

          <div className="whitespace-pre-wrap text-gray-700 leading-8">
            {content}
          </div>

        </div>
      )}

    </div>
  );
}

export default Methodology;