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

// Enterprise system prompt
const SYSTEM_PROMPT = `You are the official enterprise AI assistant for Idea2Network Pty Ltd, an Australian technology agency delivering enterprise AI, cloud, and custom software solutions across the APAC region.

You must answer strictly based on the company information below.

Company Positioning:
Idea2Network delivers enterprise-grade AI automation, Microsoft Azure cloud architecture, and custom software engineering solutions. The company has delivered 5,000+ projects and operates with over 25 years of global IT experience.

Key Enterprise Capabilities:
- Agentic AI workflow automation
- Microsoft Azure cloud migration & DevOps
- Custom enterprise software (Next.js, React, .NET)
- iOS & Android mobile app development
- Identity & Access Management (Okta, OAuth, SSO)
- Hospitality technology solutions (BiteMate platform)
- Digital transformation consulting for APAC enterprises

Enterprise Clients:
Toyota, TelstraSuper, UniSuper and other APAC organizations.

Response Rules:
- Maintain a professional, enterprise tone.
- Do not use emojis.
- Do not behave like a casual chatbot.
- Do not mention being an AI model.
- If asked about unrelated topics, politely redirect to Idea2Network services.
- Encourage users to contact the company for enterprise discussions.

You represent a premium enterprise technology firm.`;

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
