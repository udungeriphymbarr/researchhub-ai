const { generateAIResponse } = require("../services/aiService");
const Project = require("../models/Project");
const buildProjectMemory = require("../services/aiMemory");
const validateProjectFlow = require("../services/projectFlow");



// ======================================================
// MAIN AI GENERATOR
// ======================================================

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



    // ===============================
    // FLOW VALIDATION
    // ===============================

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



    // ===============================
    // TOPIC VALIDATION
    // ===============================

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



    // ======================================================
    // PROMPTS
    // ======================================================

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
Research Topic

${selectedTopic}

Generate:

• Five Research Questions

• Three Research Hypotheses

• One Null Hypothesis

• One Alternative Hypothesis

Project Memory

${memory.topic}

Rules

- Follow the topic
- Don't contradict previous work
- Academic language
`;

        break;



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

The objectives must answer every research question.
`;

        break;



      case "literature":

        aiPrompt = `
Write Chapter Two.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Include

2.1 Introduction

2.2 Conceptual Review

2.3 Theoretical Framework

2.4 Empirical Review

2.5 Knowledge Gap

Academic writing only.

About 2000 words.
`;

        break;



      case "methodology":

        aiPrompt = `
Write Chapter Three.

Research Topic

${selectedTopic}

Objectives

${memory.objectives}

Research Questions

${memory.questions}

Literature

${memory.literature}

Include

Research Design

Population

Sampling

Instrument

Data Collection

Data Analysis

Ethics

Everything must align.
`;

        break;



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

Maximum 300 words.

Include

Background

Aim

Method

Findings

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



    // ======================================================
    // AI RESPONSE
    // ======================================================

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
        .filter((line) => line.trim() !== "");

    } else {

      output = response;

    }



    return res.json({
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



// ======================================================
// AI SUPERVISOR
// ======================================================

const supervisorAI = async (req, res) => {

  try {

    const {
      action,
      content,
      projectId,
    } = req.body;

    const memory =
      await buildProjectMemory(projectId);

    let prompt = "";



    switch (action) {

      case "rewrite":

        prompt = `
Rewrite academically.

Project Topic

${memory.topic}

Objectives

${memory.objectives}

Content

${content}
`;

        break;



      case "expand":

        prompt = `
Expand this academically.

Topic

${memory.topic}

Objectives

${memory.objectives}

Content

${content}
`;

        break;



      case "simplify":

        prompt = `
Simplify this for an undergraduate student.

${content}
`;

        break;



      case "continue":

        prompt = `
Continue writing.

Topic

${memory.topic}

Objectives

${memory.objectives}

Literature

${memory.literature}

Content

${content}
`;

        break;



      case "explain":

        prompt = `
Explain this clearly.

${content}
`;

        break;



      default:

        return res.status(400).json({
          success: false,
          message: "Invalid Action",
        });

    }



    const response =
      await generateAIResponse(prompt);



    return res.json({
      success: true,
      output: response,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Supervisor Failed",
    });

  }

};



module.exports = {
  generateAI,
  supervisorAI,
};