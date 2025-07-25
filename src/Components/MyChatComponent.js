import React, { useState } from "react";

function MyChatComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendToOpenAI(prompt) {
    const response = await fetch('https://corsproxy.io/?https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || JSON.stringify(data);
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input }]);
    const reply = await sendToOpenAI(input);
    setMessages(msgs => [...msgs, { sender: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <div style={{ minHeight: 200, marginBottom: 16 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <b>{msg.sender === 'user' ? 'You' : 'AI'}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '70%', padding: 8, borderRadius: 4, border: '1px solid #aaa' }}
      />
      <button onClick={handleSend} style={{ marginLeft: 8, padding: '8px 16px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none' }}>
        Send
      </button>
    </div>
  );
}

export default MyChatComponent; 