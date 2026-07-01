const { generateAIResponse } = require("../services/aiService");
const Project = require("../models/Project");
const Generation = require("../models/Generation");
const buildProjectMemory = require("../services/aiMemory");

const generateAI = async (req, res) => {
  try {
    const {
      type,
      course,
      prompt,
      projectId,
    } = req.body;

    // ===========================
    // Load Project + AI Memory
    // ===========================

    let project = null;
    let previousGenerations = [];

    if (projectId) {
      project = await Project.findById(projectId);

      previousGenerations = await Generation.find({
        projectId,
      }).sort({
        createdAt: 1,
      });
    }

    const selectedTopic =
      project?.selectedTopic || prompt;

    const memory = projectId
  ? await buildProjectMemory(projectId)
  : {
      topic: "",
      questions: "",
      objectives: "",
      literature: "",
      methodology: "",
      abstract: "",
    };

    // ===========================
    // Validation
    // ===========================

    if (type === "topic") {
      if (!course || !prompt) {
        return res.status(400).json({
          success: false,
          message:
            "Department and Area of Interest are required.",
        });
      }
    }

    if (
      type !== "topic" &&
      !selectedTopic
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a research topic first.",
      });
    }

    // ===========================
    // Prompt Builder
    // ===========================

    switch (type) {

      case "topic":
        aiPrompt = `
You are a senior university research supervisor.

Generate TEN unique undergraduate research project topics.

Department:
${course}

Area of Interest:
${prompt}

Requirements:

• Undergraduate level
• Practical
• Current
• Specific
• Researchable
• No numbering
• One topic per line
• No explanations
`;
        break;

      case "question":
        aiPrompt = `
You are preparing an undergraduate research project.

Research Topic

${selectedTopic}

Previously Generated Topic

${memory.topic}

Generate:

• Five Research Questions

• Three Research Hypotheses

• One Null Hypothesis

• One Alternative Hypothesis

Rules:

- Follow the selected topic.
- Follow previous AI generations.
- Don't contradict previous outputs.
- Academic language only.

The questions MUST directly answer the selected topic.
Do not repeat previous generations.
`;
        break;

      case "objective":
        aiPrompt = `
Research Topic

${selectedTopic}

Research Questions

${memory.questions}

Generate:

GENERAL OBJECTIVE

SPECIFIC OBJECTIVES (5)

SCOPE OF STUDY

DELIMITATION OF STUDY

The objectives must answer every research question.
`;
        break;

      case "literature":
        aiPrompt = `
Write Chapter Two (Literature Review).

Research Topic

${selectedTopic}

Research Questions

${memory.questions}

Objectives

${memory.objectives}

Include:

2.1 Introduction

2.2 Conceptual Review

2.3 Theoretical Framework

2.4 Empirical Review

2.5 Knowledge Gap

Requirements:

- Academic writing
- About 2000 words
- Proper headings
- Consistent with objectives and research questions.

Everything must align with the objectives.
`;
        break;

      case "methodology":
        aiPrompt = `
Write Chapter Three (Methodology).

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Literature Summary

${memory.literature}


Include:

3.1 Research Design

3.2 Study Area

3.3 Population

3.4 Sample Size

3.5 Sampling Technique

3.6 Data Collection

3.7 Data Analysis

3.8 Ethical Considerations

Everything must align with previous chapters.
`;
        break;

      case "abstract":
        aiPrompt = `
Write a complete undergraduate Abstract.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Literature

${memory.literature}

Methodology

${memory.methodology}

Include:

• Background

• Aim

• Methodology

• Findings

• Conclusion

• Keywords

Maximum 300 words.

Ensure it summarizes the entire project consistently.
`;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid AI tool.",
        });
    }

    // ===========================
    // Generate AI
    // ===========================

    const response =
      await generateAIResponse(aiPrompt);

    // ===========================
    // Format Output
    // ===========================

    let output;

    if (
      type === "topic" ||
      type === "question" ||
      type === "objective"
    ) {
      output = response
        .split("\n")
        .filter(
          (line) => line.trim() !== ""
        );
    } else {
      output = response;
    }

    res.status(200).json({
      success: true,
      output,
    });

  } catch (error) {

    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: "AI Generation Failed.",
    });

  }
};

module.exports = {
  generateAI,
};