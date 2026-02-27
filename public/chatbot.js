(function () {
  'use strict';

  // ─── CONFIG ───────────────────────────────────────────────────────────────
  const CHATBOT_API_URL = 'https://idea2networkchatbot.onrender.com/chat'; // ← Change to your deployed URL
  // For local testing use: 'http://localhost:3000/chat'

  const BOT_NAME = 'idea2network AI';
  const BUBBLE_EMOJI = '💬';
  const PRIMARY_COLOR = '#6C47FF';
  const PRIMARY_DARK = '#4f32cc';
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
      background: rgba(255,255,255,0.25);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
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
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff; font-size: 13px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-bottom: 2px;
    }

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
    <button id="i2n-bubble" aria-label="Open chat">${BUBBLE_EMOJI}</button>

    <div id="i2n-window" role="dialog" aria-label="${BOT_NAME}">
      <div id="i2n-header">
        <div id="i2n-header-info">
          <div id="i2n-avatar">🤖</div>
          <div>
            <h3>${BOT_NAME}</h3>
            <p>● Online now</p>
          </div>
        </div>
        <button id="i2n-close" aria-label="Close chat">✕</button>
      </div>

      <div id="i2n-messages"></div>

      <div id="i2n-typing">
        <div class="i2n-bubble-icon">🤖</div>
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
      ? `<div class="i2n-text">${escapedText}</div><div class="i2n-bubble-icon">👤</div>`
      : `<div class="i2n-bubble-icon">🤖</div><div class="i2n-text">${escapedText}</div>`;
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
