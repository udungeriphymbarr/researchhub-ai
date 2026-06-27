import { useState } from "react";

function GenerationCard({ generation }) {

    const copyResult = () => {

        const text = Array.isArray(generation.output)
            ? generation.output.join("\n")
            : generation.output;

        navigator.clipboard.writeText(text);

        alert("Copied!");
    };

    return (

        <div className="bg-white rounded-2xl shadow p-6 border">

            <div className="flex justify-between items-center mb-5">

                <div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {generation.type.toUpperCase()}

                    </span>

                </div>

                <small className="text-gray-500">

                    {new Date(
                        generation.createdAt
                    ).toLocaleString()}

                </small>

            </div>

            <h3 className="font-bold mb-3">

                Prompt

            </h3>

            <div className="bg-gray-100 rounded-lg p-4 mb-5">

                {generation.input}

            </div>

            <h3 className="font-bold mb-3">

                AI Result

            </h3>

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

            <div className="flex gap-3 mt-6">

                <button
                    onClick={copyResult}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    📋 Copy
                </button>

            </div>

        </div>

    );

}

export default GenerationCard;