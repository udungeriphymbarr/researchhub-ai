const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateTopicsAI = async (req, res) => {
  try {
    const { course, interest } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Generate 10 unique undergraduate research project topics.

Department: ${course}
Area of Interest: ${interest}

Return only the topics.
One topic per line.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const topics = response
      .split("\n")
      .filter((item) => item.trim() !== "");

    res.status(200).json({
      success: true,
      topics,
    });

  } catch (error) {
    console.log("Gemini Error:", error.message);

    const { course, interest } = req.body;

    const fallbackTopics = [
      `Assessment of ${interest} in ${course}`,
      `Impact of ${interest} on Students in ${course}`,
      `Evaluation of ${interest} Practices in ${course}`,
      `Challenges of ${interest} in ${course}`,
      `Role of ${interest} in Academic Performance`,
      `Effects of ${interest} on Educational Development`,
      `Awareness of ${interest} among Students`,
      `Strategies for Improving ${interest} in ${course}`,
      `Factors Influencing ${interest} in ${course}`,
      `Comparative Study of ${interest} in Selected Institutions`,
    ];

    res.status(200).json({
      success: true,
      aiFallback: true,
      topics: fallbackTopics,
    });
  }
};

module.exports = {
  generateTopicsAI,
};