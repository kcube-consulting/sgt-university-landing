import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { config } from '../config';

export default function AIAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your SGT University AI counselor. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openai = new OpenAI({
    apiKey: config.openai.apiKey,
    dangerouslyAllowBrowser: true
  });

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an AI counselor for SGT University. Provide helpful information about courses, admissions, campus life, and facilities. Keep responses under 100 words."
          },
          ...messages,
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      const aiMessage = completion.choices[0].message;
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("OpenAI Error:", err);
      setError("Sorry, I'm having trouble responding. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-96 border border-gray-200">
        <div className="p-4 border-b bg-blue-700 text-white rounded-t-lg flex justify-between items-center">
          <h3 className="font-bold">SGT AI Counselor</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            ×
          </button>
        </div>
        <div className="h-64 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500">
              <div className="inline-block animate-pulse">Thinking...</div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about SGT University..."
              className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}