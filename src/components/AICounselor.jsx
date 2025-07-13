
import React, { useState } from 'react';

export default function AICounselor() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([{ role: "bot", text: "Hi! I’m your AI Counselor. Ask me anything about SGT University." }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input) return;
    setChat([...chat, { role: "user", text: input }, { role: "bot", text: "Thanks! We'll get back shortly." }]);
    setInput('');
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg">
        🤖 Speak with SGT AI Counselor
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-500 text-xl">×</button>
            <h3 className="text-xl font-bold mb-4">SGT AI Counselor</h3>
            <div className="h-48 overflow-y-auto text-sm border p-2 mb-2 bg-gray-50">
              {chat.map((msg, idx) => (
                <div key={idx} className={`my-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`${msg.role === 'user' ? 'bg-blue-100' : 'bg-green-100'} px-2 py-1 rounded inline-block`}>{msg.text}</span>
                </div>
              ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." className="w-full border p-2 mb-2" />
            <button onClick={sendMessage} className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
