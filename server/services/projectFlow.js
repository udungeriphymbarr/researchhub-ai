const validateProjectFlow = (type, memory, selectedTopic) => {

    if (type !== "topic" && !selectedTopic) {
        return "Please select a research topic first.";
    }

    switch (type) {

        case "question":
            return null;

        case "objective":

            if (!memory.questions.trim()) {
                return "Generate Research Questions first.";
            }

            return null;

        case "literature":

            if (!memory.objectives.trim()) {
                return "Generate Objectives first.";
            }

            return null;

        case "methodology":

            if (!memory.literature.trim()) {
                return "Generate Literature Review first.";
            }

            return null;

        case "abstract":

            if (!memory.methodology.trim()) {
                return "Generate Methodology first.";
            }

            return null;

        default:
            return null;

    }

};

module.exports = validateProjectFlow;