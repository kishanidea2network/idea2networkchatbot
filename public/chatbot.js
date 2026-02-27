(function () {
  'use strict';

  // ─── CONFIG ───────────────────────────────────────────────────────────────
  const CHATBOT_API_URL = 'https://idea2networkchatbot.onrender.com/chat';
  const BOT_NAME = 'Idea2Network';
  const SUBTITLE = 'Enterprise AI & Software Solutions';
  const LOGO_URL = 'https://idea2network.com.au/wp-content/uploads/2026/02/idea2network-logo.png';
  const PRIMARY_COLOR = '#C51C5A'; // Idea2Network Logo Pink
  const PRIMARY_DARK = '#9E1547';
  const SECONDARY_COLOR = '#F9F9F9'; // Cleaner white/grey for enterprise
  const TEXT_COLOR = '#2B2B36'; // Professional dark slate

  // ─── INJECT CSS ────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #i2n-bubble {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(197, 28, 90, 0.45);
      z-index: 999999;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border: 2px solid #fff;
      outline: none;
      animation: i2n-pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
    }
    #i2n-bubble img {
      width: 34px;
      height: 34px;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }
    #i2n-bubble:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(197, 28, 90, 0.6);
    }
    #i2n-bubble.i2n-open { transform: scale(0.9); }

    @keyframes i2n-pop {
      0%   { transform: scale(0); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    #i2n-window {
      position: fixed;
      bottom: 104px;
      right: 24px;
      width: 380px;
      height: 560px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 16px 50px rgba(0,0,0,0.14), 0 4px 15px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      z-index: 999998;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      transform: scale(0.8) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.2s ease;
      border: 1px solid rgba(0,0,0,0.05);
    }
    #i2n-window.i2n-visible {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    #i2n-header {
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    #i2n-header-info { display: flex; align-items: center; gap: 14px; }
    #i2n-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      padding: 6px; box-sizing: border-box;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    #i2n-avatar img { width: 100%; height: 100%; object-fit: contain; }
    #i2n-header-text { display: flex; flex-direction: column; }
    #i2n-header h3 { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: 0.3px; }
    #i2n-header p  { margin: 4px 0 0; font-size: 11.5px; opacity: 0.9; font-weight: 400; }
    #i2n-close {
      background: transparent;
      border: none; color: #fff; cursor: pointer; font-size: 22px;
      width: 32px; height: 32px; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
      opacity: 0.8;
    }
    #i2n-close:hover { background: rgba(255,255,255,0.15); opacity: 1; }

    #i2n-messages {
      flex: 1; overflow-y: auto; padding: 20px 16px;
      display: flex; flex-direction: column; gap: 14px;
      scroll-behavior: smooth;
      background: #fafafa;
    }
    #i2n-messages::-webkit-scrollbar { width: 5px; }
    #i2n-messages::-webkit-scrollbar-thumb { background: #d1d1d1; border-radius: 4px; }

    .i2n-msg { display: flex; align-items: flex-end; gap: 10px; animation: i2n-fadein 0.25s ease; width: 100%; }
    .i2n-msg.i2n-user { flex-direction: row-reverse; }

    @keyframes i2n-fadein {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .i2n-bubble-icon {
      width: 30px; height: 30px; border-radius: 50%;
      background: #fff;
      border: 1px solid #eaeaea;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-bottom: 2px;
      padding: 4px; box-sizing: border-box;
      box-shadow: 0 2px 5px rgba(0,0,0,0.04);
    }
    .i2n-bubble-icon img { width: 100%; height: 100%; object-fit: contain; }
    
    .i2n-user-icon {
      width: 30px; height: 30px; border-radius: 50%;
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-bottom: 2px;
      box-shadow: 0 2px 5px rgba(197, 28, 90, 0.2);
    }
    .i2n-user-icon svg { width: 16px; height: 16px; fill: #fff; }

    .i2n-text {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.6;
      word-break: break-word;
      color: ${TEXT_COLOR};
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .i2n-msg.i2n-bot .i2n-text {
      background: #ffffff;
      border: 1px solid #efefef;
      border-bottom-left-radius: 4px;
    }
    .i2n-msg.i2n-user .i2n-text {
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      color: #fff;
      border-bottom-right-radius: 4px;
      border: none;
    }
    
    /* Typing indicator */
    #i2n-typing {
      display: none;
      align-items: flex-end;
      gap: 10px;
      padding: 0 16px 10px;
    }
    #i2n-typing.i2n-show { display: flex; }
    .i2n-typing-bubble {
      background: #ffffff;
      border: 1px solid #efefef;
      border-radius: 12px;
      border-bottom-left-radius: 4px;
      padding: 12px 16px;
      display: flex; gap: 5px; align-items: center;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      height: 20px;
    }
    .i2n-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: ${PRIMARY_COLOR};
      animation: i2n-bounce 1.4s infinite ease-in-out both;
      opacity: 0.6;
    }
    .i2n-dot:nth-child(1) { animation-delay: -0.32s; }
    .i2n-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes i2n-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); opacity: 1; }
    }

    #i2n-input-area {
      padding: 14px 16px;
      background: #fff;
      border-top: 1px solid #eaeaea;
      display: flex;
      gap: 12px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    #i2n-input {
      flex: 1;
      border: 1px solid #dcdcdc;
      background: #fbfbfb;
      border-radius: 8px;
      padding: 11px 14px;
      font-size: 14px;
      resize: none;
      outline: none;
      max-height: 120px;
      line-height: 1.5;
      font-family: inherit;
      transition: all 0.2s;
      color: ${TEXT_COLOR};
    }
    #i2n-input:focus { 
      border-color: ${PRIMARY_COLOR};
      background: #fff;
      box-shadow: 0 0 0 3px rgba(197, 28, 90, 0.1);
    }
    #i2n-input::placeholder { color: #a0a0a0; }

    #i2n-send {
      width: 44px; height: 44px;
      border-radius: 8px;
      background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK});
      border: none; cursor: pointer; color: #fff;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(197, 28, 90, 0.25);
    }
    #i2n-send:hover { 
      transform: translateY(-1px); 
      box-shadow: 0 4px 12px rgba(197, 28, 90, 0.35); 
    }
    #i2n-send:active {
      transform: translateY(1px);
      box-shadow: 0 1px 4px rgba(197, 28, 90, 0.2); 
    }
    #i2n-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    #i2n-send svg { width: 18px; height: 18px; fill: #fff; margin-left: 2px; }

    /* Mobile responsive */
    @media (max-width: 480px) {
      #i2n-window {
        bottom: 0; right: 0; left: 0;
        width: 100%; height: 100vh;
        height: 100dvh; /* For modern mobile browsers */
        border-radius: 0;
        border: none;
      }
      #i2n-bubble { bottom: 20px; right: 20px; }
      #i2n-header { border-radius: 0; padding: 16px; }
    }
  `;
  document.head.appendChild(style);

  // ─── BUILD HTML ────────────────────────────────────────────────────────────
  const container = document.createElement('div');
  container.innerHTML = `
    <button id="i2n-bubble" aria-label="Open chat">
      <img src="${LOGO_URL}" alt="Chat">
    </button>

    <div id="i2n-window" role="dialog" aria-label="${BOT_NAME}">
      <div id="i2n-header">
        <div id="i2n-header-info">
          <div id="i2n-avatar"><img src="${LOGO_URL}" alt="Logo"></div>
          <div id="i2n-header-text">
            <h3>${BOT_NAME}</h3>
            <p>${SUBTITLE}</p>
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
        <textarea id="i2n-input" rows="1" placeholder="Type your message..." maxlength="1000"></textarea>
        <button id="i2n-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
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
  const userIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

  function appendMessage(text, role) {
    const isUser = role === 'user';
    const msgEl = document.createElement('div');
    msgEl.className = `i2n-msg ${isUser ? 'i2n-user' : 'i2n-bot'}`;

    const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    msgEl.innerHTML = isUser
      ? `<div class="i2n-text">${escapedText}</div><div class="i2n-user-icon">${userIconSVG}</div>`
      : `<div class="i2n-bubble-icon"><img src="${LOGO_URL}" alt="Logo"></div><div class="i2n-text">${escapedText}</div>`;

    messages.appendChild(msgEl);
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
        const welcome = 'Welcome to Idea2Network.\n\nWe deliver enterprise AI automation, Azure cloud architecture, and custom software solutions across APAC.\n\nHow can we assist you today?';
        appendMessage(welcome, 'assistant');
        conversationHistory.push({ role: 'assistant', content: welcome });
      }, 400);
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
      const reply = data.reply || 'An unexpected error occurred. Please contact our support team.';

      appendMessage(reply, 'assistant');
      conversationHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
      appendMessage('Connection error. Please try again or contact us directly if the issue persists.', 'assistant');
      console.error('[Idea2Network Chatbot]', err);
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
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

})();
