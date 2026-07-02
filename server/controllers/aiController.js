const { generateAIResponse } = require("../services/aiService");
const Project = require("../models/Project");
const buildProjectMemory = require("../services/aiMemory");
const validateProjectFlow = require("../services/projectFlow");
const User = require("../models/User");

const generateAI = async (req, res) => {
  try {
    const {
      type,
      course,
      prompt,
      projectId,
    } = req.body;

    let project = null;

    if (projectId) {
      project = await Project.findById(projectId);
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
    // FLOW VALIDATION
    // ===========================

    const flowError = validateProjectFlow(
      type,
      memory,
      selectedTopic
    );

    if (flowError) {
      return res.status(400).json({
        success: false,
        message: flowError,
      });
    }

    // ===========================
    // TOPIC VALIDATION
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

    let aiPrompt = "";

    switch (type) {

      // ===========================
      // TOPIC
      // ===========================

      case "topic":

        aiPrompt = `
You are an experienced university research supervisor.

Generate exactly TEN unique undergraduate research topics.

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

      // ===========================
      // QUESTIONS
      // ===========================

      case "question":

        aiPrompt = `
You are writing an undergraduate research project.

Research Topic

${selectedTopic}

Previous Memory

${memory.topic}

Generate:

• Five Research Questions

• Three Research Hypotheses

• One Null Hypothesis

• One Alternative Hypothesis

Rules

• Questions must align with the topic.

• Do not contradict previous outputs.

• Academic language only.

• No explanations.
`;

        break;

      // ===========================
      // OBJECTIVES
      // ===========================

      case "objective":

        aiPrompt = `
Research Topic

${selectedTopic}

Research Questions

${memory.questions}

Generate

GENERAL OBJECTIVE

SPECIFIC OBJECTIVES (5)

SCOPE OF STUDY

DELIMITATION OF STUDY

Every objective MUST answer at least one research question.
`;

        break;

      // ===========================
      // LITERATURE
      // ===========================

      case "literature":

        aiPrompt = `
Write Chapter Two.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Include:

2.1 Introduction

2.2 Conceptual Review

2.3 Theoretical Framework

2.4 Empirical Review

2.5 Knowledge Gap

Requirements

• About 2000 words

• Academic writing

• Consistent with the objectives

• Proper headings
`;

        break;

      // ===========================
      // METHODOLOGY
      // ===========================

      case "methodology":

        aiPrompt = `
Write Chapter Three.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Literature Summary

${memory.literature}

Include

Research Design

Study Area

Population

Sample Size

Sampling Technique

Instrument

Data Collection

Data Analysis

Ethical Considerations

Everything must align with previous chapters.
`;

        break;

      // ===========================
      // ABSTRACT
      // ===========================

      case "abstract":

        aiPrompt = `
Write an undergraduate Abstract.

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

Requirements

Maximum 300 words.

Include

Background

Aim

Methodology

Expected Findings

Conclusion

Keywords
`;

        break;

      default:

        return res.status(400).json({
          success: false,
          message: "Invalid AI Tool",
        });

    }

    // ===========================
    // AI RESPONSE
    // ===========================

    const response =
      await generateAIResponse(aiPrompt);

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

    // Increase AI usage count
await User.findByIdAndUpdate(
  req.user.id,
  {
    $inc: {
      usageCount: 1,
    },
  }
);

    return res.status(200).json({
      success: true,
      output,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI Generation Failed",
    });

  }
};

module.exports = {
  generateAI,
};