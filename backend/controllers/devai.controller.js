const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askDevAI = async (req, res) => {
  try {
    const { question, videoTitle, videoDescription, transcript } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question required" });
    }

    const prompt = `
You are an expert coding tutor helping a student.

Lesson Title: ${videoTitle || "General Programming"}
Lesson Description: ${videoDescription || "No description provided"}

Lesson Transcript:
${transcript || "No transcript available"}

Student Question:
${question}

Instructions:
1. First try to answer using the lesson transcript.
2. If not enough info, answer generally.
3. Keep explanation clear and beginner friendly.
4. Give examples if needed.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI failed" });
  }
};
