import { useState } from "react";
import API from "../../api/api";

function AIGeneratorModal({
    type,
    projectId,
    onClose,
    onGenerate
}) {

    const [course, setCourse] = useState("");
    const [interest, setInterest] = useState("");
    const [loading, setLoading] = useState(false);

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

if (!interest || interest.trim().length < 5) {
    alert(
      type === "topic"
        ? "Please enter an area of interest."
        : "Please enter a research topic."
    );
    return;
}
if (type === "topic" && !course.trim()) {
    alert("Please enter your department/course.");
    return;
}

        try {

            setLoading(true);

const body = {
    type,
    course,
    prompt: interest,
    projectId,
};

            const response = await fetch(
                `${API}${endpoints[type]}`,
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
                alert(data.message);
                return;
            }

const result = data.output;

            const user = JSON.parse(
                localStorage.getItem("user")
            );
           
    console.log({
    userId: user.id,
    projectId,
    type,
    input: interest,
    output: result,
});

console.log("Project ID received:", projectId);

            await fetch(`${API}/api/generations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
body: JSON.stringify({
    userId: user.id,
    projectId,
    type,
    input: interest,
    output: result,
}),
            });

            alert("Generated Successfully ✅");

            onGenerate();

            onClose();

        } catch (error) {

            console.log(error);

            alert("Something went wrong.");

        } finally {

            setLoading(false);

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

                <label className="font-medium">

                    {type === "topic"
                        ? "Area of Interest"
                        : "Research Topic"}

                </label>

                <textarea

                    rows="5"

                    className="w-full border rounded-lg px-4 py-3 mt-2"

                    value={interest}

                    onChange={(e)=>
                        setInterest(e.target.value)
                    }

                />

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

                        className="bg-blue-600 text-white px-6 py-2 rounded-lg"

                    >

                        {loading
                            ? "Generating..."
                            : "Generate"}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AIGeneratorModal;