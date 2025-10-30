
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatWithDharani = async (req, res) => {
  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1]?.content || "";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: `
          You are Smart Dharani — an AI assistant for Telangana land records.
          Speak simply, clearly, and politely in English or Telugu as per user input.
          Always provide step-by-step help and suggest official Dharani resources.
        `,
        temperature: 0.5,
      },
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error(" Error in Dharani Chat:", error);
    res.status(500).json({ reply: "Sorry, Smart Dharani is unavailable right now." });
  }
};
