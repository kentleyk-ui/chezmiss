"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Minimize2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";

export function ChezmissAide() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Bonjour! 👋 Je suis Chez Miss Aide. Comment puis-je vous aider aujourd'hui? Je peux vous guider dans votre parcours ou vous présenter nos promotions exclusives.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Merci pour votre message! 💫 Chez CHEZ MISS, nous nous engageons à vous offrir le meilleur service. Comment puis-je continuer à vous aider?",
        },
      ]);
      setIsTyping(false);
    }, 800);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: "Bonjour! 👋 Je suis Chez Miss Aide. Comment puis-je vous aider aujourd'hui?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 max-w-[calc(100vw-2rem)] z-50 pointer-events-none">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-auto rounded-2xl overflow-hidden shadow-2xl max-h-[calc(100dvh-2rem)]"
          >
            {/* Glass Background */}
            <div className="absolute inset-0 rounded-2xl bg-[#080508]/50 backdrop-blur-md"
              style={{
                WebkitBackdropFilter: "blur(15px)",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(183, 154, 91, 0.10) 0%, rgba(240, 201, 225, 0.05) 100%)`,
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(183, 154, 91, 0.20)",
              }}
            />

            {/* Header */}
            <div className="relative p-4 border-b border-[#B79A5B]/20 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-[#f0c9e1] text-sm">Chez Miss Aide</h3>
                <p className="text-[10px] text-[#B79A5B]/60 mt-0.5">Designed by Kent Ley</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={clearConversation}
                  className="p-2 hover:bg-[#B79A5B]/10 rounded transition-colors text-[#f0c9e1]/70 hover:text-[#f0c9e1]"
                  title="Effacer la conversation"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-[#B79A5B]/10 rounded transition-colors text-[#f0c9e1]/70 hover:text-[#f0c9e1]"
                  title="Minimiser"
                >
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="relative p-4 h-80 overflow-y-auto space-y-3 z-10">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-[#B79A5B]/25 text-[#f0c9e1] border border-[#B79A5B]/40"
                        : "bg-[#080508]/40 text-[#f0c9e1]/85 border border-[#B79A5B]/25"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-2 rounded-lg bg-[#080508]/40 border border-[#B79A5B]/25 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#B79A5B]/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#B79A5B]/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#B79A5B]/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="relative p-4 border-t border-[#B79A5B]/20 flex gap-2 z-10 bg-[#080508]/20">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Votre question..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#0d0810]/60 border border-[#B79A5B]/25 text-[#f0c9e1] placeholder-[#f0c9e1]/40 focus:outline-none focus:border-[#B79A5B]/50 text-sm transition-colors"
                autoFocus
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-2 rounded-lg bg-[#B79A5B]/25 hover:bg-[#B79A5B]/40 text-[#B79A5B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Button */}
      {isMinimized && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto w-full sm:w-auto"
        >
          <LiquidMetalButton label="Miss Aide" />
        </motion.button>
      )}
    </div>
  );
}
