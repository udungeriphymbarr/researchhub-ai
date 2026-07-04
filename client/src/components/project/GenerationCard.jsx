import { useState } from "react";
import API, { authFetch } from "../../api/api";
import SupervisorModal from "./SupervisorModal";
import { toast } from "react-toastify";

function GenerationCard({ generation, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [action, setAction] = useState(null);
  const [selecting, setSelecting] = useState(false);

  const copyResult = () => {
    const text = Array.isArray(generation.output)
      ? generation.output.join("\n")
      : generation.output;

    navigator.clipboard.writeText(text);

    toast.success("Copied!");
  };

  const selectTopic = async (topic) => {
    const confirmSelect = await toast.promise(
      new Promise((resolve) => {
        const result = window.confirm("Use this as the official research topic for this project?");
        resolve(result);
      }),
      {
        pending: "Confirming topic selection...",
        success: "Topic selected successfully!",
        error: "Failed to select topic.",
      }
    );

    if (!confirmSelect) return;

    try {
      setSelecting(true);

      const response = await authFetch(
        `/api/projects/${generation.projectId}/topic`,
        {
          method: "PUT",
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
        toast.success("✅ Topic selected successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to select topic.");
    } finally {
      setSelecting(false);
    }
  };

  const deleteGeneration = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this generation?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(true);

      const response = await authFetch(
        `/api/generations/${generation._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        if (onDelete) {
          onDelete(generation._id);
        }
      } else {
        toast.error(data.message || "Delete failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  const supervisorAction = async (action) => {

    try {

        setAiLoading(true);

        const response = await authFetch(
            `/api/ai/supervisor`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    action,

                    projectId: generation.projectId,

                    content: Array.isArray(generation.output)
                        ? generation.output.join("\n")
                        : generation.output,

                }),
            }
        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        setModalTitle(action.toUpperCase());

        setModalContent(data.output);

        setModalOpen(true);

    } catch (error) {

        console.log(error);

        alert("AI Supervisor failed.");

    } finally {

        setAiLoading(false);

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

      {/* AI Result */}
      <h3 className="font-bold mb-3">AI Result</h3>

      <div className="space-y-3">
        {(Array.isArray(generation.output)
          ? generation.output
          : [generation.output]
        ).map((line, index) => (
          <div
            key={index}
            className="border rounded-lg p-4"
          >
            <p>{line}</p>

            {generation.type === "topic" && (
              <button
                onClick={() => selectTopic(line)}
                disabled={selecting}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300"
              >
                {selecting
                  ? "Selecting..."
                  : "✅ Select Topic"}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
<div className="flex flex-wrap gap-3 mt-6">

<button
onClick={copyResult}
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
📋 Copy
</button>

<button
onClick={deleteGeneration}
disabled={deleting}
className="bg-red-600 text-white px-4 py-2 rounded-lg"
>
🗑 Delete
</button>

</div>
{modalOpen && (

<SupervisorModal

title={modalTitle}

content={modalContent}

onClose={() => setModalOpen(false)}

/>

)}
    </div>
  );
}

export default GenerationCard;