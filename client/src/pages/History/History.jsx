import { useEffect, useState } from "react";

function History() {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    fetchGenerations();
  }, []);

  const fetchGenerations = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `http://localhost:5000/api/generations?userId=${user.id}`
      );

      const data = await response.json();

      if (data.success) {
        setGenerations(data.generations);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGeneration = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/generations/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchGenerations();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">
        Research History
      </h1>

      <p className="text-gray-500 mb-8">
        View all your previous generations.
      </p>

      {/* Empty State */}
      {generations.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold mb-2">
            No Research Yet
          </h2>

          <p className="text-gray-500">
            Generate your first topic, question, or outline.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {generations.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-lg">
                  {item.input}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {item.type}
              </span>
            </div>

            {/* Output */}
            <ul className="space-y-2">
              {item.output.map((output, index) => (
                <li
                  key={index}
                  className="border rounded p-2"
                >
                  {output}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  copyToClipboard(
                    item.output.join("\n")
                  )
                }
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Copy
              </button>

              <button
                onClick={() =>
                  deleteGeneration(item._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;