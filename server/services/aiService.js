const axios = require("axios");

const generateAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324",

        messages: [
          {
            role: "system",
            content:
              "You are an experienced university research supervisor. Respond professionally using academic writing.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.6,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("OPENROUTER ERROR:");
    console.log(error.response?.data || error.message);

    throw new Error("AI generation failed");
  }
};

module.exports = {
  generateAIResponse,
};