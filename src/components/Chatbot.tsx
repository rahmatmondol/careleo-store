"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";
import Image from "next/image";

type Message = {
  id: string;
  text: string;
  isBot: boolean;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi there! 👋 I'm Leo, your AI pet care assistant. How can I help you today?", isBot: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isSending) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionIdRef.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.sessionId) sessionIdRef.current = data.sessionId;

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data?.reply || "Leo couldn't respond right now. Please try again.",
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: "Leo is unreachable right now. Please try again in a moment.", isBot: true },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Leo assistant" : "Open Leo assistant"}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center justify-center
          ${isOpen ? 'bg-[var(--brand-surface)] text-[var(--foreground)] border border-[var(--brand-line)] hover:bg-[var(--brand-surface-soft)]' : 'brand-primary-button hover:scale-105'}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window — a fixed 350px panel plus a 24px offset overflowed any
          phone narrower than ~374px, so it spans the viewport gutters instead. */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 right-4 h-[min(500px,70vh)] sm:left-auto sm:right-6 sm:w-[350px] sm:h-[500px] bg-[var(--brand-surface)] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-[var(--brand-line)] animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-[var(--brand-primary)] p-4 flex items-center gap-3 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 relative z-10 shadow-sm overflow-hidden border-2 border-white">
              <Image src="/Leo.png" alt="Leo Avatar" width={40} height={40} className="object-cover" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-sm">Leo Assistant</h3>
              <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span> Online
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[var(--background)] flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${msg.isBot ? 'bg-white border border-[var(--brand-line)] shadow-sm' : 'bg-[var(--brand-surface-soft)] text-[var(--foreground)] border border-[var(--brand-line)]'}`}>
                  {msg.isBot ? <Image src="/Leo.png" alt="Leo Avatar" width={32} height={32} className="object-cover" /> : <User size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-[var(--brand-surface)] border border-[var(--brand-line)] text-[var(--foreground)] rounded-tl-none shadow-sm' : 'bg-[var(--brand-primary)] text-white rounded-tr-none shadow-md shadow-[var(--brand-shadow)]'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[var(--brand-surface)] border-t border-[var(--brand-line)]">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isSending}
                placeholder={isSending ? "Leo is typing..." : "Ask about pet care..."}
                className="flex-1 px-4 py-2.5 bg-[var(--background)] border border-[var(--brand-line)] rounded-xl text-sm outline-none focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/20 transition-all text-[var(--foreground)] placeholder:text-[var(--brand-ink-soft)] font-medium disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isSending}
                className="p-2.5 brand-primary-button rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
