import { useState } from "react";
import AIGeneratorModal from "./AIGeneratorModal";
import API, { authFetch } from "../../api/api";

function AIWorkspace({
    project,
    onGenerate
}) {
  const [openModal, setOpenModal] = useState(null);

  const tools = [
    {
      id: "topic",
      icon: "🚀",
      title: "Generate Topic",
      description:
        "Generate AI-powered research topics.",
      color:
        "from-blue-500 to-blue-700",
    },
    {
      id: "question",
      icon: "❓",
      title: "Research Questions",
      description:
        "Generate research questions from your topic.",
      color:
        "from-green-500 to-green-700",
    },
    {
      id: "objective",
      icon: "🎯",
      title: "Objectives",
      description:
        "Generate research objectives.",
      color:
        "from-purple-500 to-purple-700",
    },
    {
      id: "literature",
      icon: "📚",
      title: "Literature Review",
      description:
        "Generate literature review ideas.",
      color:
        "from-orange-500 to-orange-700",
    },
    {
      id: "methodology",
      icon: "📝",
      title: "Methodology",
      description:
        "Generate research methodology.",
      color:
        "from-pink-500 to-pink-700",
    },
    {
      id: "abstract",
      icon: "📄",
      title: "Abstract",
      description:
        "Generate a professional abstract.",
      color:
        "from-gray-600 to-gray-800",
    },
  ];

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            AI Research Workspace
          </h2>

          <p className="text-gray-500 mt-2">
            Select any AI tool below to
            generate content directly inside
            this project.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() =>
                setOpenModal(tool.id)
              }
              className={`
                cursor-pointer
                rounded-2xl
                p-6
                text-white
                bg-gradient-to-r
                ${tool.color}
                hover:scale-[1.03]
                transition
                duration-300
                shadow-lg
              `}
            >
              <div className="text-5xl mb-4">
                {tool.icon}
              </div>

              <h3 className="text-xl font-bold">
                {tool.title}
              </h3>

              <p className="mt-3 opacity-90 text-sm">
                {tool.description}
              </p>

              <button
                className="mt-6 bg-white text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Open Tool →
              </button>
            </div>
          ))}

        </div>

      </div>

      {openModal && (
<AIGeneratorModal
    type={openModal}
    project={project}
    onClose={() => setOpenModal(null)}
    onGenerate={onGenerate}
/>
      )}
    </>
  );
}

export default AIWorkspace;