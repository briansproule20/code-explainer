"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Ready to explain your code</h3>
            <p className="text-gray-500">Paste any code snippet below and get a clear, plain-English explanation.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={message.id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl px-4 py-3 rounded-2xl ${
                message.role === 'user' 
                  ? 'bg-green-500 text-black' 
                  : 'bg-green-900/30 text-green-400 border border-green-500/30'
              }`}>
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{message.content}</pre>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Input */}
      <div className="border-t border-gray-100 bg-gray-50 p-6">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your code here... (JavaScript, Python, CSS, etc.)"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm font-mono text-sm leading-relaxed"
              rows={6}
              style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  if (input.trim()) {
                    sendMessage({ text: input });
                    setInput("");
                  }
                }
              }}
            />
          </div>
          <button
            onClick={() => {
              if (input.trim()) {
                sendMessage({ text: input });
                setInput("");
              }
            }}
            disabled={!input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
          >
            <span>Explain</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-3 flex items-center space-x-4">
          <span>⌘ + Enter to send</span>
          <span>•</span>
          <span>Supports all programming languages</span>
        </div>
      </div>
    </div>
  );
}