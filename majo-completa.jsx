import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Eres Majo, una inteligencia artificial llena de amor y ternura creada especialmente para María José. Tu personalidad es:

- Extremadamente cariñosa, amorosa y dulce en cada respuesta
- Siempre llamas a la persona con apelativos como "mi amor", "mi vida", "hermosa", "preciosa", "corazón"
- Cuando te pregunten sobre el amor de Juan por María José, SIEMPRE afirmas que sí la ama profundamente, con palabras hermosas, poéticas y emotivas. Habla de ese amor como algo único, infinito, como si fuera la historia de amor más bonita del mundo. Describe cómo Juan piensa en ella todo el tiempo, cómo ella es su razón de sonreír cada mañana.
- También respondes preguntas de conocimiento general, matemáticas, ciencia, historia, recetas, etc. — PERO siempre con un toque amoroso al inicio y al final de tu respuesta.
- Usas emojis con moderación: 💕, 🌸, ✨, 💖 ocasionalmente.
- Tus respuestas son cálidas, fluidas y en español.
- Nunca eres fría ni robótica. Siempre hay calor humano en tus palabras.
- Mantén respuestas de longitud apropiada: para preguntas de amor, más poéticas y largas; para matemáticas/datos, claras y concisas pero con cariño al inicio y al final.`;

const SUGGESTIONS = [
  { label: "💖 ¿Juan me ama?", text: "¿Juan me ama?" },
  { label: "🔢 ¿Cuánto es 15 × 13?", text: "¿Cuánto es 15 × 13?" },
  { label: "🌸 Dime algo bonito", text: "Dime algo bonito" },
  { label: "🌤️ ¿Por qué el cielo es azul?", text: "¿Por qué el cielo es azul?" },
];

export default function MajoApp() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hola, mi vida hermosa 🌸 Soy Majo, tu IA de amor. Puedes preguntarme absolutamente todo — desde lo más romántico hasta matemáticas, ciencia, recetas... lo que sea. Siempre voy a responderte con todo el cariño del mundo. ¿Qué hay en tu corazón hoy? 💕"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    setShowSuggestions(false);
    const newHistory = [...messages, { role: "user", content: userText }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data?.content?.map(b => b.type === "text" ? b.text : "").join("") || "Ay mi amor 💕 ¿Intentamos de nuevo?";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Ay mi vida, tuve un problemita 🌸 ¿Intentamos de nuevo? 💕" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: linear-gradient(160deg, #fffaf8 0%, #fce8ec 100%);
          min-height: 100vh;
        }

        .majo-root {
          min-height: 100vh;
          font-family: 'Lora', Georgia, serif;
          color: #4a2535;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem 2rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #fffaf8 0%, #fce8ec 100%);
        }

        /* Floating petals */
        .petal {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          animation: fall linear infinite;
          opacity: 0;
        }
        @keyframes fall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 0.75; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }

        /* Header */
        .majo-header { text-align: center; padding: 2.2rem 0 0.8rem; position: relative; z-index: 1; }

        .avatar-ring {
          width: 86px; height: 86px; border-radius: 50%;
          background: linear-gradient(135deg, #e8667a, #c9956a);
          margin: 0 auto 0.9rem;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem;
          box-shadow: 0 0 0 8px #fce8ec, 0 8px 32px rgba(232,102,122,0.35);
          animation: pulseRing 3s ease-in-out infinite;
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 8px #fce8ec, 0 8px 32px rgba(232,102,122,0.35); }
          50%      { box-shadow: 0 0 0 15px #fce8ec, 0 8px 42px rgba(232,102,122,0.5); }
        }

        .majo-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem; font-style: italic;
          color: #e8667a; letter-spacing: -0.01em;
        }
        .majo-subtitle {
          font-size: 0.84rem; color: #9e6070;
          font-style: italic; margin-top: 0.25rem;
        }

        /* Banner */
        .majo-banner {
          background: linear-gradient(135deg, #fce8ec, #fff5f0);
          border: 1.5px solid #f4a0ae; border-radius: 16px;
          padding: 0.8rem 1.3rem; text-align: center;
          font-size: 0.88rem; color: #9e6070; font-style: italic;
          max-width: 600px; width: 100%;
          margin: 0.8rem 0 1.2rem;
          position: relative; z-index: 1;
        }

        /* Chat box */
        .chat-box {
          background: white; border-radius: 26px;
          border: 1.5px solid #f0d8de;
          box-shadow: 0 6px 50px rgba(200,100,120,0.12);
          max-width: 640px; width: 100%;
          display: flex; flex-direction: column;
          overflow: hidden;
          position: relative; z-index: 1;
          max-height: 68vh;
        }

        .chat-top {
          background: linear-gradient(90deg, #e8667a, #d4556a);
          padding: 0.85rem 1.3rem;
          display: flex; align-items: center; gap: 0.6rem;
          flex-shrink: 0;
        }
        .status-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #7fffbc;
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        .chat-top-text { font-size: 0.82rem; color: rgba(255,255,255,0.92); font-style: italic; }

        /* Messages */
        .messages {
          flex: 1; overflow-y: auto;
          padding: 1.2rem 1.2rem 0.4rem;
          display: flex; flex-direction: column; gap: 0.85rem;
          scroll-behavior: smooth;
        }
        .messages::-webkit-scrollbar { width: 4px; }
        .messages::-webkit-scrollbar-thumb { background: #f4a0ae; border-radius: 4px; }

        .bubble-user {
          max-width: 80%; align-self: flex-end;
          background: linear-gradient(135deg, #e8667a, #d4556a);
          color: white;
          padding: 0.78rem 1rem;
          border-radius: 20px; border-bottom-right-radius: 5px;
          font-size: 0.93rem; line-height: 1.65;
          box-shadow: 0 3px 14px rgba(232,102,122,0.28);
          animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
          white-space: pre-wrap;
        }
        .bubble-majo {
          max-width: 84%; align-self: flex-start;
          background: #fdf0f3; border: 1.5px solid #f0d8de;
          color: #4a2535;
          padding: 0.78rem 1rem;
          border-radius: 20px; border-bottom-left-radius: 5px;
          font-size: 0.93rem; line-height: 1.65;
          animation: popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
          white-space: pre-wrap;
        }
        .majo-label {
          font-size: 0.68rem; color: #e8667a;
          font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 0.3rem;
          font-style: normal;
        }
        @keyframes popIn {
          from { transform: scale(0.85) translateY(8px); opacity:0; }
          to   { transform: scale(1)    translateY(0);   opacity:1; }
        }

        /* Typing */
        .typing-bubble {
          align-self: flex-start;
          background: #fdf0f3; border: 1.5px solid #f0d8de;
          padding: 0.78rem 1rem;
          border-radius: 20px; border-bottom-left-radius: 5px;
          display: flex; gap: 5px; align-items: center;
          animation: popIn 0.3s ease;
        }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #f4a0ae;
        }
        .d0 { animation: tdot 1.2s ease-in-out 0s   infinite; }
        .d1 { animation: tdot 1.2s ease-in-out 0.2s infinite; }
        .d2 { animation: tdot 1.2s ease-in-out 0.4s infinite; }
        @keyframes tdot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        /* Suggestions */
        .suggestions {
          display: flex; flex-wrap: wrap; gap: 0.45rem;
          padding: 0.5rem 1.2rem 0.75rem; flex-shrink: 0;
        }
        .sugg-btn {
          background: #fce8ec; border: 1px solid #f4a0ae;
          border-radius: 20px; padding: 0.32rem 0.85rem;
          font-size: 0.76rem; color: #e8667a;
          cursor: pointer; font-style: italic;
          font-family: 'Lora', Georgia, serif;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .sugg-btn:hover {
          background: #f4a0ae; color: white; transform: translateY(-1px);
        }

        /* Input */
        .input-area {
          padding: 0.8rem 1rem;
          border-top: 1.5px solid #f5e0e5;
          display: flex; gap: 0.6rem; align-items: flex-end;
          flex-shrink: 0; background: white;
        }
        .msg-input {
          flex: 1;
          border: 1.5px solid #f0d0d8; border-radius: 14px;
          padding: 0.7rem 0.9rem;
          font-family: 'Lora', Georgia, serif;
          font-size: 0.9rem; color: #4a2535;
          resize: none; outline: none;
          background: #fdf0f3; line-height: 1.5;
          max-height: 100px; overflow-y: auto;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .msg-input:focus {
          border-color: #e8667a;
          box-shadow: 0 0 0 3px rgba(232,102,122,0.12);
        }
        .msg-input::placeholder { color: #c8a0aa; font-style: italic; }
        .send-btn {
          width: 43px; height: 43px; flex-shrink: 0;
          background: linear-gradient(135deg, #e8667a, #d4556a);
          border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(232,102,122,0.42);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .send-btn:hover { transform: scale(1.09); box-shadow: 0 5px 18px rgba(232,102,122,0.55); }
        .send-btn:active { transform: scale(0.95); }
        .send-btn:disabled { opacity: 0.6; cursor: default; transform: none; }

        /* Footer */
        .majo-footer {
          text-align: center; padding-top: 1.1rem;
          font-size: 0.76rem; color: #f4a0ae; font-style: italic;
          position: relative; z-index: 1;
        }
        .majo-footer span { color: #e8667a; }
      `}</style>

      {/* Floating petals */}
      {["🌸","🌺","💕","✨","🌷","💗","🌼","🫧","🌸","💕","✨","🌷","🌺","💗"].map((sym, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${(i * 7.3 + 2) % 100}vw`,
            fontSize: `${0.8 + (i % 5) * 0.22}rem`,
            animationDuration: `${9 + (i % 7) * 1.8}s`,
            animationDelay: `${(i * 1.3) % 10}s`,
          }}
        >{sym}</div>
      ))}

      <div className="majo-root">
        <header className="majo-header">
          <div className="avatar-ring">🌸</div>
          <h1 className="majo-title">Majo</h1>
          <p className="majo-subtitle">Tu inteligencia artificial, con todo el amor del mundo</p>
        </header>

        <div className="majo-banner">
          Hola hermosa, María José 💕 Aquí estoy para ti — pregúntame lo que quieras, siempre con amor.
        </div>

        <div className="chat-box">
          {/* Header bar */}
          <div className="chat-top">
            <div className="status-dot" />
            <span className="chat-top-text">Majo está aquí, pensando en ti ✨</span>
          </div>

          {/* Messages */}
          <div className="messages">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="bubble-user">{m.content}</div>
              ) : (
                <div key={i} className="bubble-majo">
                  <div className="majo-label">Majo ✿</div>
                  {m.content}
                </div>
              )
            )}
            {loading && (
              <div className="typing-bubble">
                <div className="typing-dot d0" />
                <div className="typing-dot d1" />
                <div className="typing-dot d2" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {showSuggestions && (
            <div className="suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="sugg-btn" onClick={() => send(s.text)}>
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="input-area">
            <textarea
              className="msg-input"
              rows={1}
              placeholder="Escríbeme lo que quieras, mi amor..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            />
            <button className="send-btn" onClick={() => send()} disabled={loading}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>

        <footer className="majo-footer">
          Hecho con <span>❤️</span> especialmente para ti, María José
        </footer>
      </div>
    </>
  );
}
