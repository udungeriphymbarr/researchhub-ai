import { useState } from "react";
import API from "../../api/api";

function ChapterOutline() {
  const [topic, setTopic] = useState("");
  const [outline, setOutline] = useState([]);

  const generateOutline = async () => {
    const generatedOutline = [
      "1.1 Background of Study",
      "1.2 Statement of the Problem",
      "1.3 Aim and Objectives",
      "1.4 Research Questions",
      "1.5 Significance of the Study",
      "1.6 Scope of the Study",
    ];

    setOutline(generatedOutline);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await fetch(`${API}/api/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          projectId,
          type: "topic",
          input: interest,
          output: data.topics,
        }),
      });

      console.log("Outline saved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">Chapter Outline Generator</h1>

      <p className="text-gray-500 mb-8">
        Generate a Chapter One structure for your research topic.
      </p>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Research Topic</label>

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your topic"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          onClick={generateOutline}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Generate Outline
        </button>

        {outline.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Chapter One</h2>

            <ul className="space-y-3">
              {outline.map((item, index) => (
                <li key={index} className="bg-gray-50 border rounded-lg p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterOutline;
