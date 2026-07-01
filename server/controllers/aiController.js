const {
  generateAIResponse,
} = require("../services/aiService");
const Project = require("../models/Project");
const Generation = require("../models/Generation");

const generateAI = async (req, res) => {
  try {
const {
    type,
    course,
    prompt,
    projectId,
} = req.body;

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

const memory = previousGenerations
  .map((item) => {
    return `
${item.type.toUpperCase()}

${Array.isArray(item.output)
  ? item.output.join("\n")
  : item.output}
`;
  })
  .join("\n\n");

    switch (type) {
      case "topic":
aiPrompt = `
You are an experienced university research supervisor.

Generate 10 unique undergraduate research project topics.

Department:
${course}

Area of Interest:
${prompt}

Requirements:

• Suitable for undergraduate students
• Practical and researchable
• Current and relevant
• Specific and clear
• Avoid repetition
• Do not number the topics
• One topic per line
`;
        break;

      case "question":
aiPrompt = `
You are an academic research supervisor.

Research Topic:

${selectedTopic}

Existing Research Memory:

${memory}

Generate:

1. Five Research Questions

2. Three Research Hypotheses

3. One Null Hypothesis

4. One Alternative Hypothesis

Rules:

• Undergraduate level
• Clear academic language
• No explanations
• Use headings
• Don't repeat previous generations.
• Make them consistent with the topic.
• Return only the questions.
`;
        break;

      case "objective":
aiPrompt = `
Research Topic:

${selectedTopic}

Existing Research Memory:

${memory}

Generate:

GENERAL OBJECTIVE

SPECIFIC OBJECTIVES
(5)

SCOPE OF STUDY

DELIMITATION OF STUDY

Use proper academic headings.
`;
        break;

      case "literature":
aiPrompt = `
Research Topic:

${selectedTopic}

Existing Research Memory:

${memory}

Write a Literature Review that follows the objectives and research questions.

Include:

1. Introduction

2. Conceptual Review

3. Theoretical Framework

4. Empirical Review

5. Knowledge Gap

Requirements:

• Academic writing
• Around 1000 words
• Proper headings
• No numbering inside paragraphs
`;
        break;

      case "methodology":
aiPrompt = `
Research Topic:

${selectedTopic}

Existing Research Memory:

${memory}

Write Chapter Three that aligns with the literature review and objectives.

Include:

3.1 Research Design

3.2 Study Area

3.3 Population

3.4 Sample Size

3.5 Sampling Technique

3.6 Data Collection

3.7 Data Analysis

3.8 Ethical Considerations

Write professionally.
`;
        break;

      case "abstract":
aiPrompt = `
Research Topic:

${selectedTopic}

Existing Research Memory:

${memory}

Write an undergraduate abstract based on the entire project.

Include:

Background

Aim

Methodology

Results

Conclusion

Keywords

Maximum 300 words.
`;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid AI tool."
        });
    }

    const response =
      await generateAIResponse(aiPrompt);

    const output = response
      .split("\n")
      .filter((item) => item.trim() !== "");

    res.status(200).json({
      success: true,
      output,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI Generation Failed",
    });

  }
};

module.exports = {
  generateAI,
};