const {
  generateAIResponse,
} = require("../services/aiService");
const Generation = require("../models/Generation");

const generateAI = async (req, res) => {
  try {
const {
    type,
    course,
    prompt,
    projectId,
} = req.body;

    let aiPrompt = "";

    let projectContext = "";

if (projectId) {

    const history = await Generation.find({
        projectId,
    }).sort({
        createdAt: 1,
    });

    if (history.length > 0) {

        projectContext = history
            .map(item => {

                const output = Array.isArray(item.output)
                    ? item.output.join("\n")
                    : item.output;

                return `
${item.type.toUpperCase()}

Prompt:
${item.input}

Result:
${output}
`;

            })
            .join("\n\n");

    }

}

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

${prompt}

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
`;
        break;

      case "objective":
aiPrompt = `
Research Topic:

${prompt}

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
Write an undergraduate literature review.

Research Topic:

${prompt}

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
Write Chapter Three for this project.

Topic:

${prompt}

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
Write an undergraduate research abstract.

Topic:

${prompt}

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