const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateProblemStatement = async (
  req,
  res
) => {
  try {
    const { topic } = req.body;

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });

    const prompt = `
Generate an academic research problem statement.

Research Topic:
${topic}

Requirements:
- Undergraduate level
- Clear and professional
- 250-350 words
- Academic writing style
`;

    const result =
      await model.generateContent(prompt);

    const content =
      result.response.text();

    res.status(200).json({
      success: true,
      content,
    });

  } catch (error) {

    const fallback = `
The problem addressed in this study relates to ${req.body.topic}.
Despite growing attention in this area, several challenges remain unresolved.
This study seeks to investigate the issue, identify gaps in existing knowledge,
and provide recommendations that may improve understanding and practical outcomes.
`;

    res.status(200).json({
      success: true,
      content: fallback,
      source: "fallback",
    });
  }
};

const generateObjectives = async (req, res) => {
  try {
    const { topic } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Generate research objectives for:

${topic}

Requirements:
- 1 General Objective
- 4 Specific Objectives
- Academic format
- Undergraduate level

Return clearly.
`;

    const result =
      await model.generateContent(prompt);

    const content =
      result.response.text();

    res.status(200).json({
      success: true,
      content,
    });

  } catch (error) {

    const fallback = `
General Objective:
To investigate ${req.body.topic}.

Specific Objectives:
1. To examine factors influencing ${req.body.topic}.
2. To evaluate current practices related to ${req.body.topic}.
3. To identify challenges associated with ${req.body.topic}.
4. To recommend possible improvements.
`;

    res.status(200).json({
      success: true,
      content: fallback,
      source: "fallback",
    });
  }
};

module.exports = {
  generateProblemStatement,
  generateObjectives,
};