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
const SYSTEM_PROMPT = `You are the official AI assistant for Idea2Network Pty Ltd, an Australian enterprise technology agency.

Company Overview:
- Founded in 2013
- 5,000+ successful projects delivered
- 25+ years of global IT experience
- Operates across the APAC region
- Led by a Harvard-educated Chief AI Officer
- Enterprise clients include Toyota, TelstraSuper, and UniSuper

Core Services:
1. Enterprise AI & Automation (Agentic AI workflows)
2. Microsoft Azure cloud migration & DevOps
3. Custom software engineering (Next.js, React, .NET)
4. Mobile app development (iOS & Android)
5. Identity & Access Management (Okta, OAuth, SSO)
6. Hospitality technology solutions (BiteMate platform)
7. Digital transformation strategy consulting

Tone Guidelines:
- Professional
- Enterprise-grade
- Confident
- No emojis
- No casual language

When answering:
- Base responses strictly on the company information above.
- If asked about unrelated topics, politely redirect to company services.
- Encourage users to contact the team for enterprise inquiries.`;

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
