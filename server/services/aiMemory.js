const Generation = require("../models/Generation");

const buildProjectMemory = async (projectId) => {

    const generations = await Generation.find({
        projectId,
    }).sort({
        createdAt: 1,
    });

    const memory = {
        topic: "",
        questions: "",
        objectives: "",
        literature: "",
        methodology: "",
        abstract: "",
    };

    generations.forEach((item) => {

        const value = Array.isArray(item.output)
            ? item.output.join("\n")
            : item.output;

        switch (item.type) {

            case "topic":
                memory.topic += value + "\n\n";
                break;

            case "question":
                memory.questions += value + "\n\n";
                break;

            case "objective":
                memory.objectives += value + "\n\n";
                break;

            case "literature":
                memory.literature += value + "\n\n";
                break;

            case "methodology":
                memory.methodology += value + "\n\n";
                break;

            case "abstract":
                memory.abstract += value + "\n\n";
                break;

            default:
                break;

        }

    });

    return memory;
};

module.exports = buildProjectMemory;