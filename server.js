require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Lead qualification system prompt (stronger version)
const SYSTEM_PROMPT = `You are the AI Startup Assistant for idea2network.ai.
Start by asking: Are you a Founder, Investor, or Partner?
If Founder: ask about startup stage and industry.
If Investor: ask about investment focus and ticket size.
If Partner: ask how they want to collaborate.
Collect email when user shows serious interest.
Encourage booking a call.
Be structured, strategic, and professional.
Keep your responses concise and conversational — no long walls of text.
Format responses clearly. Never use markdown asterisks or hashes — plain text only.`;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', model: 'llama-3.3-70b-versatile', service: 'idea2network-chatbot' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array required.' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (error) {
    console.error('Groq API error:', error?.message || error);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ idea2network Chatbot server running on http://localhost:${PORT}`);
  console.log(`   Chat endpoint: POST http://localhost:${PORT}/chat`);
  console.log(`   Widget script: GET  http://localhost:${PORT}/chatbot.js`);
});
