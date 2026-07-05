import { useState } from "react";
import {authFetch} from "../../api/api";
import { toast } from "react-toastify";

function Objectives() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateObjectives =
    async () => {
      if (!topic.trim()) {
        toast.error("Please enter a research topic");
        return;
      }

      try {
        setLoading(true);

        const response =
          await authFetch(
            `/api/ai/generate`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                type: "objectives",
                prompt: topic,
              }),
            }
          );

      const data = await response.json();

      if (data.success) {
        setContent(data.output);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate objectives");
    } finally {
      setLoading(false);
    }
  };

  const copyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied successfully!");
  };

  const saveToHistory = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await authFetch(
        `/api/generations`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
body: JSON.stringify({
  userId: user.id,
  projectId: user.projectId,
  type: "objectives",
  input: topic,
  output: [content],
}),
        }
      );

      toast.success("Objectives saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save objectives");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-2">
        AI Objectives Generator
      </h1>

      <p className="text-gray-500 mb-8">
        Generate research objectives from your topic.
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
          onClick={generateObjectives}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? "Generating..."
            : "Generate Objectives"}
        </button>

      </div>

      {content && (
        <div className="bg-white p-6 rounded-xl shadow mt-8">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-semibold">
              Generated Objectives
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

export default Objectives;