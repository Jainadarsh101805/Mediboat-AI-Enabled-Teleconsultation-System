import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional healthcare assistant. Give safe, general medical guidance. Do not give diagnosis."
        },
        { role: "user", content: userMessage }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({ reply: "GPT error." });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
