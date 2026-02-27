(function () {
  'use strict';

  // ─── CONFIG ───────────────────────────────────────────────────────────────
  const CHATBOT_API_URL = 'https://idea2networkchatbot.onrender.com/chat'; // ← Change to your deployed URL
  // For local testing use: 'http://localhost:3000/chat'

  const BOT_NAME = 'idea2network AI';
  const LOGO_URL = 'data:image/png;base64,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';
  const PRIMARY_COLOR = '#C51C5A'; // Idea2Network Logo Pink
  const PRIMARY_DARK = '#9E1547';
  const SECONDARY_COLOR = '#F0EDFF';

  // ─── INJECT CSS ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #i2n-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff;
      font-size: 26px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(108,71,255,0.45);
      z-index: 999999;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: none;
      outline: none;
      animation: i2n-pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    }
    #i2n-bubble:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(108,71,255,0.6);
    }
    #i2n-bubble.i2n-open { transform: scale(0.9); }

    @keyframes i2n-pop {
      0%   { transform: scale(0); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    #i2n-window {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 370px;
      height: 520px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      z-index: 999998;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      transform: scale(0.8) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.2s ease;
    }
    #i2n-window.i2n-visible {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    #i2n-header {
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    #i2n-header-info { display: flex; align-items: center; gap: 10px; }
    #i2n-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      padding: 4px; box-sizing: border-box;
      overflow: hidden;
    }
    #i2n-avatar img { width: 100%; height: 100%; object-fit: contain; }
    #i2n-header h3 { margin: 0; font-size: 15px; font-weight: 700; }
    #i2n-header p  { margin: 2px 0 0; font-size: 11px; opacity: 0.85; }
    #i2n-close {
      background: rgba(255,255,255,0.2);
      border: none; color: #fff; cursor: pointer; font-size: 18px;
      width: 30px; height: 30px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    #i2n-close:hover { background: rgba(255,255,255,0.35); }

    #i2n-messages {
      flex: 1; overflow-y: auto; padding: 14px 14px;
      display: flex; flex-direction: column; gap: 10px;
      scroll-behavior: smooth;
    }
    #i2n-messages::-webkit-scrollbar { width: 4px; }
    #i2n-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

    .i2n-msg { display: flex; align-items: flex-end; gap: 6px; animation: i2n-fadein 0.25s ease; }
    .i2n-msg.i2n-user { flex-direction: row-reverse; }

    @keyframes i2n-fadein {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .i2n-bubble-icon {
      width: 28px; height: 28px; border-radius: 50%;
      background: #fff;
      border: 1px solid #eee;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-bottom: 2px;
      padding: 3px; box-sizing: border-box;
      overflow: hidden;
    }
    .i2n-bubble-icon img { width: 100%; height: 100%; object-fit: contain; }

    .i2n-text {
      max-width: 78%;
      padding: 10px 13px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
    }
    .i2n-msg.i2n-bot .i2n-text {
      background: ${SECONDARY_COLOR};
      color: #1a1a2e;
      border-bottom-left-radius: 4px;
    }
    .i2n-msg.i2n-user .i2n-text {
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff;
      border-bottom-right-radius: 4px;
    }
    .i2n-time {
      font-size: 10px;
      color: #aaa;
      margin-top: 2px;
      text-align: right;
    }
    .i2n-msg.i2n-bot .i2n-time { text-align: left; padding-left: 36px; }
    .i2n-msg.i2n-user .i2n-time { text-align: right; padding-right: 36px; }

    /* Typing indicator */
    #i2n-typing {
      display: none;
      align-items: flex-end;
      gap: 6px;
      padding: 0 14px 6px;
    }
    #i2n-typing.i2n-show { display: flex; }
    .i2n-typing-bubble {
      background: ${SECONDARY_COLOR};
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      padding: 10px 14px;
      display: flex; gap: 4px; align-items: center;
    }
    .i2n-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: ${PRIMARY_COLOR};
      animation: i2n-bounce 1.2s infinite ease-in-out;
    }
    .i2n-dot:nth-child(2) { animation-delay: 0.2s; }
    .i2n-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes i2n-bounce {
      0%,80%,100% { transform: translateY(0); opacity: 0.5; }
      40%          { transform: translateY(-6px); opacity: 1; }
    }

    #i2n-input-area {
      padding: 10px 12px 14px;
      border-top: 1px solid #f0f0f0;
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    #i2n-input {
      flex: 1;
      border: 1.5px solid #e5e5e5;
      border-radius: 12px;
      padding: 9px 13px;
      font-size: 13.5px;
      resize: none;
      outline: none;
      max-height: 100px;
      line-height: 1.4;
      font-family: inherit;
      transition: border-color 0.15s;
      color: #1a1a2e;
    }
    #i2n-input:focus { border-color: ${PRIMARY_COLOR}; }
    #i2n-input::placeholder { color: #bbb; }

    #i2n-send {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      border: none; cursor: pointer; color: #fff;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 2px 10px rgba(108,71,255,0.35);
    }
    #i2n-send:hover { transform: scale(1.08); box-shadow: 0 4px 14px rgba(108,71,255,0.5); }
    #i2n-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    #i2n-send svg { width: 17px; height: 17px; fill: #fff; }

    #i2n-powered {
      text-align: center;
      font-size: 10px;
      color: #bbb;
      padding: 0 0 8px;
    }
    #i2n-powered a { color: #bbb; text-decoration: none; }

    /* Mobile responsive */
    @media (max-width: 480px) {
      #i2n-window {
        bottom: 0; right: 0; left: 0;
        width: 100%; height: 92vh;
        border-radius: 20px 20px 0 0;
      }
      #i2n-bubble { bottom: 16px; right: 16px; }
    }
  `;
  document.head.appendChild(style);

  // ─── BUILD HTML ────────────────────────────────────────────────────────────
  const container = document.createElement('div');
  container.innerHTML = `
    <button id="i2n-bubble" aria-label="Open chat">
      <img src="${LOGO_URL}" style="width: 32px; height: 32px; object-fit: contain;" alt="Chat">
    </button>

    <div id="i2n-window" role="dialog" aria-label="${BOT_NAME}">
      <div id="i2n-header">
        <div id="i2n-header-info">
          <div id="i2n-avatar"><img src="${LOGO_URL}" alt="Logo"></div>
          <div>
            <h3>${BOT_NAME}</h3>
            <p>● Online now</p>
          </div>
        </div>
        <button id="i2n-close" aria-label="Close chat">✕</button>
      </div>

      <div id="i2n-messages"></div>

      <div id="i2n-typing">
        <div class="i2n-bubble-icon"><img src="${LOGO_URL}" alt="Logo"></div>
        <div class="i2n-typing-bubble">
          <div class="i2n-dot"></div>
          <div class="i2n-dot"></div>
          <div class="i2n-dot"></div>
        </div>
      </div>

      <div id="i2n-input-area">
        <textarea id="i2n-input" rows="1" placeholder="Type a message..." maxlength="1000"></textarea>
        <button id="i2n-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
          </svg>
        </button>
      </div>
      <div id="i2n-powered">Powered by <a href="https://idea2network.ai" target="_blank">idea2network.ai</a></div>
    </div>
  `;
  document.body.appendChild(container);

  // ─── STATE ─────────────────────────────────────────────────────────────────
  let isOpen = false;
  let isLoading = false;
  let conversationHistory = []; // { role: 'user'|'assistant', content: '...' }

  // ─── ELEMENTS ──────────────────────────────────────────────────────────────
  const bubble = document.getElementById('i2n-bubble');
  const chatWin = document.getElementById('i2n-window');
  const closeBtn = document.getElementById('i2n-close');
  const messages = document.getElementById('i2n-messages');
  const typing = document.getElementById('i2n-typing');
  const input = document.getElementById('i2n-input');
  const sendBtn = document.getElementById('i2n-send');

  // ─── HELPERS ───────────────────────────────────────────────────────────────
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendMessage(text, role) {
    const isUser = role === 'user';
    const msgEl = document.createElement('div');
    msgEl.className = `i2n-msg ${isUser ? 'i2n-user' : 'i2n-bot'}`;

    const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    msgEl.innerHTML = isUser
      ? `<div class="i2n-text">${escapedText}</div><div class="i2n-bubble-icon" style="background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK}); font-size: 13px; color: #fff; padding: 0; border: none;">👤</div>`
      : `<div class="i2n-bubble-icon"><img src="${LOGO_URL}" alt="Logo"></div><div class="i2n-text">${escapedText}</div>`;
    messages.appendChild(msgEl);

    // Timestamp
    const timeEl = document.createElement('div');
    timeEl.className = 'i2n-time';
    timeEl.textContent = getTime();
    messages.appendChild(timeEl);

    scrollToBottom();
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    typing.classList.add('i2n-show');
    scrollToBottom();
  }

  function hideTyping() {
    typing.classList.remove('i2n-show');
  }

  function setLoading(val) {
    isLoading = val;
    sendBtn.disabled = val;
    input.disabled = val;
    if (val) showTyping(); else hideTyping();
  }

  // ─── TOGGLE CHAT ───────────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    bubble.classList.add('i2n-open');
    chatWin.classList.add('i2n-visible');
    input.focus();
    // Send welcome message once
    if (conversationHistory.length === 0) {
      setTimeout(() => {
        const welcome = 'Hi! Welcome to idea2network.ai 👋\n\nI\'m your AI Startup Assistant. To get started — are you a Founder, Investor, or Partner?';
        appendMessage(welcome, 'assistant');
        conversationHistory.push({ role: 'assistant', content: welcome });
      }, 350);
    }
  }

  function closeChat() {
    isOpen = false;
    bubble.classList.remove('i2n-open');
    chatWin.classList.remove('i2n-visible');
  }

  bubble.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  // ─── SEND MESSAGE ──────────────────────────────────────────────────────────
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    input.value = '';
    input.style.height = 'auto';
    appendMessage(text, 'user');
    conversationHistory.push({ role: 'user', content: text });

    setLoading(true);

    try {
      const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      const reply = data.reply || 'Sorry, I could not get a response.';

      appendMessage(reply, 'assistant');
      conversationHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
      appendMessage('⚠️ Connection error. Please try again in a moment.', 'assistant');
      console.error('[idea2network chatbot]', err);
    } finally {
      setLoading(false);
      input.focus();
    }
  }

  sendBtn.addEventListener('click', sendMessage);

  // Enter to send (Shift+Enter for newline)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

})();
