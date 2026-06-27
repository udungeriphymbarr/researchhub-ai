const {
  generateAIResponse,
} = require("../services/aiService");

const generateAI = async (req, res) => {
  try {
    const {
      type,
      course,
      prompt,
    } = req.body;

    let aiPrompt = "";

    switch (type) {
      case "topic":
        aiPrompt = `
Generate 10 unique undergraduate research topics.

Department:
${course}

Area of Interest:
${prompt}

Rules:
- Undergraduate level
- Modern topics
- One topic per line
- No numbering
`;
        break;

      case "question":
        aiPrompt = `
You are an academic supervisor.

Generate:

• 5 Research Questions

Research Topic:

${prompt}

Rules:

- Undergraduate level

- No explanations

- One question per line
`;
        break;

      case "objective":
        aiPrompt = `
Generate:

• One General Objective

• Five Specific Objectives

Research Topic:

${prompt}

Return only objectives.
`;
        break;

      case "literature":
        aiPrompt = `
Write a Literature Review for:

${prompt}

Requirements:

- Undergraduate level

- Academic writing

- Clear headings

- Around 700 words
`;
        break;

      case "methodology":
        aiPrompt = `
Write Chapter Three Methodology.

Topic:

${prompt}

Include:

Research Design

Study Area

Population

Sampling

Data Collection

Data Analysis
`;
        break;

      case "abstract":
        aiPrompt = `
Write an academic Abstract.

Research Topic:

${prompt}

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