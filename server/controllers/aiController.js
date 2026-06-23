const {
generateAIResponse,
} = require("../services/aiService");

const generateTopicsAI = async (
req,
res
) => {
try {
const { course, interest } =
req.body;

const prompt = `

Generate 10 unique undergraduate research project topics.

Department: ${course}
Area of Interest: ${interest}

Return only topics.
One topic per line.
`;

const response =
  await generateAIResponse(
    prompt
  );

const topics = response
  .split("\n")
  .filter(
    (item) =>
      item.trim() !== ""
  );

res.status(200).json({
  success: true,
  topics,
});

} catch (error) {
console.log(error);

res.status(500).json({
  success: false,
  message:
    "Failed to generate topics",
});

}
};


const generateQuestions = async (
req,
res
) => {
try {
const { course, interest } =
req.body;

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

const response =
  await generateAIResponse(
    prompt
  );

const topics = response
  .split("\n")
  .filter(
    (item) =>
      item.trim() !== ""
  );

res.status(200).json({
  success: true,
  topics,
});

} catch (error) {
console.log(error);

res.status(500).json({
  success: false,
  message:
    "Failed to generate questions",
});

}
};



module.exports = {
generateTopicsAI,
generateQuestions,
};
