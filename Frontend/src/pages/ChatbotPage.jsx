import { useState } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m your healthcare assistant. Tell me your symptoms."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <img src="/robot.png" alt="robot" style={styles.robot} />
          <h2>MediBot</h2>
        </div>

        <div style={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.msg,
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                background: m.sender === "user" ? "#2563eb" : "#e5e7eb",
                color: m.sender === "user" ? "#fff" : "#000"
              }}
            >
              {m.text}
            </div>
          ))}
          {loading && <div style={styles.typing}>🤖 typing...</div>}
        </div>

        <div style={styles.inputBar}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Describe your symptoms..."
            style={styles.input}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#e0f2fe,#f0fdf4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chatBox: {
    width: 420,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 20px 40px rgba(0,0,0,.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 16,
    borderBottom: "1px solid #eee"
  },
  robot: { width: 40 },
  messages: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto"
  },
  msg: {
    padding: "10px 14px",
    borderRadius: 18,
    maxWidth: "80%"
  },
  typing: {
    fontSize: 12,
    color: "#666"
  },
  inputBar: {
    display: "flex",
    gap: 8,
    padding: 12,
    borderTop: "1px solid #eee"
  },
  input: {
    flex: 1,
    padding: 10
  }
};
