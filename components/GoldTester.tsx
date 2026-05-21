"use client";

import { useState, useRef, useEffect } from "react";
import { useGoldTheme, GOLD_COLORS, type GoldTheme } from "@/hooks/useGoldTheme";
import { motion } from "framer-motion";

export function GoldTester() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useGoldTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const goldThemes: GoldTheme[] = ["default", "champagne", "rose-gold", "royal-satin", "deep-luxe"];

  const themeLabels: Record<GoldTheme, string> = {
    default: "Cashmere",
    champagne: "Champagne",
    "rose-gold": "Rose Gold",
    "royal-satin": "Royal Satin",
    "deep-luxe": "Deep Luxe",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const currentIndex = goldThemes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % goldThemes.length;
    setTheme(goldThemes[nextIndex]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, offset]);

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-0 right-0 z-40 cursor-grab active:cursor-grabbing select-none m-4 sm:m-6"
      style={{
        transform: `translate(${position.x}px, ${-position.y}px)`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.button
          onClick={cycleTheme}
          onMouseDown={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${GOLD_COLORS[theme]} 0%, ${GOLD_COLORS[theme]}dd 100%)`,
            boxShadow: `0 0 25px ${GOLD_COLORS[theme]}77, 0 0 50px ${GOLD_COLORS[theme]}44, inset 0 0 20px rgba(255,255,255,0.3)`,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: `${GOLD_COLORS[theme]}55`,
            }}
          />

          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
            className="absolute inset-0 rounded-full border border-dashed"
            style={{
              borderColor: `${GOLD_COLORS[theme]}33`,
            }}
          />

          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 to-white/10 blur-sm" />

          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-xl z-10"
          >
            ✨
          </motion.span>
        </motion.button>

        <motion.div
          key={theme}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center pointer-events-none"
        >
          <p className="text-xs tracking-[0.1em] text-[#B79A5B] font-bold leading-tight">
            {themeLabels[theme]}
          </p>
          <p className="text-[9px] tracking-[0.12em] text-[#f0c9e1]/50 leading-tight">
            Gold Tester
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
