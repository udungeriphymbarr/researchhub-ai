import { useState } from "react";

function ResearchQuestions() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);

  const generateQuestions = async () => {
    const generatedQuestions = [
      `What is the impact of ${topic} on students?`,
      `How does ${topic} affect learning outcomes?`,
      `What are the challenges in implementing ${topic}?`,
    ];

    setQuestions(generatedQuestions);

  try {
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
      projectId,
      type: "topic",
      input: interest,
      output: data.topics,
    }),
  }
);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">
        Research Questions Generator
      </h1>

      <p className="text-gray-500 mb-8">
        Generate research questions based on your topic.
      </p>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Research Topic
          </label>

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Climate Change"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          onClick={generateQuestions}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Generate Questions
        </button>

        {questions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Generated Questions
            </h2>

            <ul className="space-y-3">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg border"
                >
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResearchQuestions;