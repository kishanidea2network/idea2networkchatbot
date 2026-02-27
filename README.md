# idea2network.ai AI Chatbot

A lightweight, WordPress-embeddable AI chatbot powered by **Groq (llama-3.3-70b-versatile)** with lead qualification built in.

---

## 📁 Project Structure

```
idea2network-chatbot/
├── server.js          # Express backend + Groq API
├── package.json
├── .env               # Your API key (never commit this)
├── .env.example       # Template for deployment
├── .gitignore
├── render.yaml        # Render.com deploy config
├── vercel.json        # Vercel deploy config
└── public/
    ├── chatbot.js     # Self-contained embed widget
    └── test.html      # Local test page
```

---

## 🚀 Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your API key to .env
# GROQ_API_KEY=your_key_here

# 3. Start the server
npm start

# 4. Open test page
# Visit: http://localhost:3000/test.html
```

---

## ☁️ Deploy to Render.com (Recommended — Free Tier)

1. Push this project to a GitHub repo
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repo
4. Render auto-detects `render.yaml`
5. In **Environment Variables**, add:
   - `GROQ_API_KEY` = your Groq API key
6. Click **Deploy**

Your live URL will be something like: `https://idea2network-chatbot.onrender.com`

---

## ☁️ Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
# Set GROQ_API_KEY in Vercel dashboard → Settings → Environment Variables
```

---

## 🔌 WordPress Embed

After deploying, add this **one line** to your WordPress site:

**Option A — Theme Footer (recommended):**
Go to **Appearance → Theme Editor → footer.php** and add before `</body>`:
```html
<script src="https://YOUR-DEPLOYED-URL.onrender.com/chatbot.js"></script>
```

**Option B — Plugin (no coding):**
Install **"Insert Headers and Footers"** plugin → paste the script tag in the Footer section.

**Option C — Elementor / page builder:**
Use an HTML widget and paste the `<script>` tag anywhere on the page.

---

## ⚙️ Customization

Edit the `CONFIG` section at the top of `public/chatbot.js`:

```js
const CHATBOT_API_URL = 'https://YOUR-DEPLOYED-URL.onrender.com/chat';
const BOT_NAME = 'idea2network AI';
const PRIMARY_COLOR = '#6C47FF';
```

Edit the system prompt in `server.js` (`SYSTEM_PROMPT` constant) to change bot behavior.

---

## 🧪 Test API Manually

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'

# Expected: {"reply":"Hi! Welcome to idea2network.ai..."}
```

---

## 🔒 Security Notes

- Never commit `.env` to Git (it's in `.gitignore`)
- Rotate your Groq API key regularly at [console.groq.com](https://console.groq.com)
- Consider adding rate limiting (`express-rate-limit`) for production
