import { useState } from "react";
import API from "../../api/api";

function GenerationCard({ generation, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const copyResult = () => {
    const text = Array.isArray(generation.output)
      ? generation.output.join("\n")
      : generation.output;

    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  const deleteGeneration = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirm) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `${API}/api/generations/${generation._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        if (onDelete) onDelete(generation._id);
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting generation");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 border">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {generation.type.toUpperCase()}
        </span>

        <small className="text-gray-500">
          {new Date(generation.createdAt).toLocaleString()}
        </small>

      </div>

      {/* Prompt */}
      <h3 className="font-bold mb-2">Prompt</h3>

      <div className="bg-gray-100 rounded-lg p-4 mb-5">
        {generation.input}
      </div>

      {/* Output */}
      <h3 className="font-bold mb-2">AI Result</h3>

      <div className="space-y-3">
        {(Array.isArray(generation.output)
          ? generation.output
          : [generation.output]
        ).map((line, index) => (
          <div
            key={index}
            className="border rounded-lg p-3"
          >
            {line}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">

        <button
          onClick={copyResult}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          📋 Copy
        </button>

        <button
          onClick={deleteGeneration}
          disabled={deleting}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-300"
        >
          {deleting ? "Deleting..." : "🗑 Delete"}
        </button>

      </div>
    </div>
  );
}

export default GenerationCard;