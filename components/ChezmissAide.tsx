"use client";

import { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";

export function ChezmissAide() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Bonjour! 👋 Je suis Chez Miss Aide. Comment puis-je vous aider aujourd'hui? Je peux vous guider dans votre parcours ou vous présenter nos promotions exclusives.",
    },
  ]);
  const [input, setInput] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    const newTimer = setTimeout(() => {
      setIsOpen(false);
    }, 20000);
    setInactivityTimer(newTimer);
  };

  // Handle send message
  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "Merci pour votre message! 💫 Chez CHEZ MISS, nous nous engageons à vous offrir le meilleur service. Comment puis-je continuer à vous aider?",
      },
    ]);
    setInput("");

    // Close keyboard on mobile
    if (inputRef.current) {
      inputRef.current.blur();
    }

    resetInactivityTimer();
  };

  // Mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Handle open/close
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetInactivityTimer();
    } else if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    resetInactivityTimer();
  };

  return (
    <div
      ref={containerRef}
      className="fixed z-40 pointer-events-none"
      style={{
        bottom: `calc(${position.y}px + 20px)`,
        right: `calc(50% - 200px + ${position.x}px)`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseMove={resetInactivityTimer}
    >
      <AnimatePresence>
        {/* Chat Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-24 right-0 w-96 rounded-2xl overflow-hidden pointer-events-auto"
          >
            {/* Highly Transparent Glass Background */}
            <div className="absolute inset-0 rounded-2xl bg-[#080508]/40 backdrop-blur-md"
              style={{
                WebkitBackdropFilter: "blur(15px)",
                background: "rgba(8, 5, 8, 0.35)",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(183, 154, 91, 0.08) 0%, rgba(240, 201, 225, 0.04) 100%)`,
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(183, 154, 91, 0.15)",
              }}
            />

            {/* Header - Draggable */}
            <div
              className="relative p-4 border-b border-[#B79A5B]/15 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
            >
              <div>
                <h3 className="font-semibold text-[#f0c9e1] text-sm">Chez Miss Aide</h3>
                <p className="text-[10px] text-[#B79A5B]/60 mt-0.5">Designed by Kent Ley</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#B79A5B]/10 rounded transition-colors"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <X size={16} className="text-[#f0c9e1]/70 hover:text-[#f0c9e1]" />
              </button>
            </div>

            {/* Messages */}
            <div className="relative p-4 h-72 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-[#B79A5B]/20 text-[#f0c9e1] border border-[#B79A5B]/30"
                        : "bg-[#080508]/30 text-[#f0c9e1]/80 border border-[#B79A5B]/20"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="relative p-4 border-t border-[#B79A5B]/15 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                onFocus={handleInputFocus}
                placeholder="Votre question..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#0d0810]/40 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/40 text-sm"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-lg bg-[#B79A5B]/20 hover:bg-[#B79A5B]/30 text-[#B79A5B] transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button - Liquid Metal */}
      <motion.button
        onClick={toggleOpen}
        onMouseEnter={resetInactivityTimer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto"
      >
        <LiquidMetalButton label="Miss Aide" />
      </motion.button>
    </div>
  );
}
