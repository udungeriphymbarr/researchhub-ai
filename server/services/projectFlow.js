const hasContent = (value) => {
  if (!value) return false;

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return String(value).trim().length > 0;
};

const validateProjectFlow = (
  type,
  memory,
  selectedTopic
) => {
  // STEP 1
  if (type !== "topic" && !selectedTopic) {
    return "Please select a research topic first.";
  }

  // STEP 2
  switch (type) {
    case "question":
      return null;

    case "objective":
      if (!hasContent(memory.questions)) {
        return "Generate Research Questions first.";
      }
      return null;

    case "literature":
      if (!hasContent(memory.objectives)) {
        return "Generate Objectives first.";
      }
      return null;

    case "methodology":
      if (!hasContent(memory.literature)) {
        return "Generate Literature Review first.";
      }
      return null;

    case "abstract":
      if (!hasContent(memory.methodology)) {
        return "Generate Methodology first.";
      }
      return null;

    default:
      return null;
  }
};

module.exports = validateProjectFlow;