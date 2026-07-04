import { useState } from "react";
import API, { authFetch } from "../../api/api";
import { toast } from "react-toastify";

function AIGeneratorModal({
    type,
    project,
    onClose,
    onGenerate
}) {

    const [course, setCourse] = useState("");
    const [interest, setInterest] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const titles = {
        topic: "Generate Research Topic",
        question: "Generate Research Questions",
        objective: "Generate Objectives",
        literature: "Generate Literature Review",
        methodology: "Generate Methodology",
        abstract: "Generate Abstract"
    };

    const endpoints = {
        topic: "/api/ai/generate",
        question: "/api/ai/generate",
        objective: "/api/ai/generate",
        literature: "/api/ai/generate",
        methodology: "/api/ai/generate",
        abstract: "/api/ai/generate"
    };

    const handleGenerate = async () => {

if (
    type === "topic" &&
    !interest.trim()
) {
    toast.error(
      type === "topic"
        ? "Please enter an area of interest."
        : "Please enter a research topic."
    );
    return;
    }
    if (type === "topic" && !course.trim()) {
        toast.error("Please enter your department/course.");
        return;
    }

    let interval;

        try {

            setLoading(true);

    const messages = [
        "🤖 AI is analyzing your project...",
        "📚 Reading previous chapters...",
        "🧠 Understanding your objectives...",
        "✍️ Writing academic content...",
        "📖 Checking research consistency...",
        "✅ Finalizing response..."
    ];

    let index = 0;

    setLoadingMessage(messages[0]);

    interval = setInterval(() => {
        index = (index + 1) % messages.length;
        setLoadingMessage(messages[index]);
    }, 1800);

    const body = {
    type,
    course,
    prompt:
        type === "topic"
            ? interest
            : project?.selectedTopic,

    projectId: project?._id,
};

    const response = await authFetch(
        `${endpoints[type]}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify(body),
                }
            );

    const data = await response.json();

    if (!data.success) {
    toast.error(data.message);

    if (
        data.message.includes(
            "You have reached your monthly limit"
        )
    ) {
        window.location.href = "/subscription";
    }
            }

const result = data.output;
           
console.log({
    projectId: project?._id,
    type,
    input: interest,
    output: result,
});

console.log("Project ID received:", project?._id);

const saveResponse = await authFetch("/api/generations", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        projectId: project?._id,
        type,
        input:
            type === "topic"
                ? interest
                : project?.selectedTopic,
        output: result,
    }),
});

const saveData = await saveResponse.json();

if (!saveData.success) {
    toast.error(saveData.message);
    return;
}

// Update local user usage count
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    user.usageCount = (user.usageCount || 0) + 1;

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
}

    toast.success("Generated Successfully ✅");
    onGenerate();
    onClose();
    } catch (error) {

            console.log(error);

            toast.error("Something went wrong.");

    } finally {
        clearInterval(interval);
        setLoading(false);
        setLoadingMessage("");
    }
 };

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-xl">

                <h2 className="text-2xl font-bold mb-6">
                    {titles[type]}
                </h2>

                {type === "topic" && (

                    <>

                        <label className="font-medium">
                            Course
                        </label>

                        <input
                            className="w-full border rounded-lg px-4 py-3 mt-2 mb-5"
                            placeholder="Biochemistry"
                            value={course}
                            onChange={(e)=>
                                setCourse(e.target.value)
                            }
                        />

                    </>

                )}
{type === "topic" ? (
    <>
        <label className="font-medium">
            Area of Interest
        </label>

        <textarea
            rows="5"
            className="w-full border rounded-lg px-4 py-3 mt-2"
            value={interest}
            onChange={(e) =>
                setInterest(e.target.value)
            }
        />
    </>
) : (
    <>
        <label className="font-medium">
            Research Topic
        </label>

        <div className="mt-2 bg-green-50 border border-green-300 rounded-lg p-4">
            <p className="font-semibold">
                {project?.selectedTopic}
            </p>

            <p className="text-green-700 text-sm mt-2">
                ✓ Using selected project topic
            </p>
        </div>
    </>
)}

{loading && (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center gap-4">

        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <div>
            <p className="font-semibold text-blue-700">
                ResearchHub AI
            </p>

            <p className="text-gray-600">
                {loadingMessage}
            </p>
        </div>

    </div>
)}

    <div className="flex justify-end gap-3 mt-8">
        
        <button
            onClick={onClose}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg"
            >
                Cancel
        </button>

<button
    onClick={handleGenerate}
    disabled={loading}
    className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-70"
>
    {loading ? (
        <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {loadingMessage}
        </>
    ) : (
        "Generate"
    )}
</button>

            </div>

        </div>

    </div>

    );

}

export default AIGeneratorModal;