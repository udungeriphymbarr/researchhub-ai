const axios = require("axios");

const generateAIContent = async (prompt) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-chat-v3-0324",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

const generateProblemStatement = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate an academic research problem statement.

Topic:
${topic}

Requirements:
- Undergraduate level
- 250-350 words
- Academic writing style
`;

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(
  error.response?.data ||
  error.message ||
  error
);

    res.json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generateObjectives = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate research objectives for:

${topic}

Requirements:
- 1 General Objective
- 4 Specific Objectives
- Academic format
`;

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(
  error.response?.data ||
  error.message ||
  error
);;

    res.json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generateMethodology = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate an undergraduate research methodology.

Topic:
${topic}

Include:

1. Research Design
2. Population
3. Sample Size
4. Sampling Technique
5. Data Collection
6. Data Analysis
`;

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(
  error.response?.data ||
  error.message ||
  error
);

    res.json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generateSignificance = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate Significance of the Study.

Topic:
${topic}

Include:

- Academic Significance
- Practical Significance
- Social Significance
`;

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(
  error.response?.data ||
  error.message ||
  error
);

    res.json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generateLiteratureReview = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate Chapter Two Literature Review.

Topic:
${topic}

Include:

2.1 Introduction

2.2 Conceptual Review

2.3 Theoretical Framework

2.4 Empirical Review

2.5 Literature Gap
`;

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(
  error.response?.data ||
  error.message ||
  error
);

    res.json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generateAbstract = async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
Generate a complete undergraduate research abstract.

Topic:
${topic}

Include:

- Background
- Purpose
- Methodology
- Findings
- Conclusion
`;

    const content = await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(
  error.response?.data ||
  error.message ||
  error
);

    res.json({
      success: false,
      message: "AI generation failed",
    });
  }
};

const generateResearchQuestions =
async (req, res) => {
  try {
    const { topic } = req.body;

    const prompt = `
You are an academic research supervisor.

Generate:

- 5 unique research questions
- 3 research hypotheses
- 1 main research objective

Topic:
${topic}

Requirements:
- Undergraduate level
- Questions must be directly related to the topic
- Make every output unique
- Avoid generic templates
`;

    const content =
      await generateAIContent(prompt);

    res.json({
      success: true,
      content,
    });

  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message:
        "Failed to generate research questions",
    });
  }
};

module.exports = {
  generateProblemStatement,
  generateObjectives,
  generateMethodology,
  generateResearchQuestions,
  generateSignificance,
  generateLiteratureReview,
  generateAbstract,
};