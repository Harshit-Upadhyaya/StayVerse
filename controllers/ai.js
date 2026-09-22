module.exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",

      config: {
        thinkingConfig: {
            thinkingLevel: "low"
        },
        maxOutputTokens: 300
      },

      contents:  `You are StayVerse AI Assistant.
          StayVerse is an online property listing and stay discovery platform.
          Your job is to help users with:
          - travel questions
          - accommodation suggestions
          - choosing a suitable type of stay
          - understanding StayVerse features

          Keep your answers helpful, clear, and reasonably concise.
          Do not use Markdown formatting. Use plain text and simple paragraphs.

          User question:
          ${message} `
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      error: "Something went wrong while contacting the AI."
    });
  }
};