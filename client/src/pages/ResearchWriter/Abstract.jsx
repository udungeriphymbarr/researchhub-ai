import { useState } from "react";

function Abstract() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAbstract = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/research/abstract",
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

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        await fetch(
          "http://localhost:5000/api/generations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({
          userId: user.id,
          projectId: user.projectId,
          type: "abstract",
          input: topic,
          output: [data.content],
          }),
          }
        );
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-2">
        AI Abstract Generator
      </h1>

      <p className="text-gray-500 mb-8">
        Generate a complete project abstract.
      </p>

      <div className="bg-white p-6 rounded-xl shadow">

        <input
          type="text"
          placeholder="Enter Research Topic"
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-3 mb-4"
        />

        <button
          onClick={generateAbstract}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Generating..."
            : "Generate Abstract"}
        </button>

        {content && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Generated Abstract
            </h2>

            <div className="bg-gray-50 border rounded-lg p-5 whitespace-pre-wrap">
              {content}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default Abstract;