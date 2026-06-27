import exportProjectPDF from "../../utils/exportProjectPDF";

function ProjectHeader({
    project,
    generations
}) {
    return (
        <div className="mb-8">

            <h1 className="text-4xl font-bold">
                {project?.title}
            </h1>

            <p className="text-gray-500 mt-2">
                {project?.description}
            </p>

            {generations.length > 0 && (

                <button
                    onClick={() =>
                        exportProjectPDF(
                            project,
                            generations
                        )
                    }
                    className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Export Project PDF
                </button>

            )}

        </div>
    );
}

export default ProjectHeader;