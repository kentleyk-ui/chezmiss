"use client";

import { cn } from "../lib/cn";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LiquidMetalGoldProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function LiquidMetalGold({
  children,
  className,
  onClick,
}: LiquidMetalGoldProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "relative px-6 py-3 rounded-xl font-semibold tracking-wide",
        "text-[#B79A5B] drop-shadow-[0_0_6px_rgba(183,154,91,0.6)]",
        "bg-gradient-to-br from-[#8A6B2F]/40 to-[#3F2D12]/20",
        "backdrop-blur-xl shadow-[0_0_25px_rgba(183,154,91,0.25)]",
        "border border-[#B79A5B]/30",
        "overflow-hidden select-none transition-all duration-300",
        className
      )}
    >
      <span
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_30%_30%,rgba(183,154,91,0.55),rgba(183,154,91,0.05))]
          opacity-80
          pointer-events-none
        "
      />

      <span
        className="
          absolute inset-0 rounded-xl
          border border-[#B79A5B]/50
          shadow-[inset_0_0_20px_rgba(183,154,91,0.45)]
          pointer-events-none
        "
      />

      <motion.span
        className="
          absolute -inset-[3px] rounded-xl
          bg-gradient-to-r from-[#B79A5B]/60 via-[#B79A5B]/20 to-[#B79A5B]/60
          blur-[8px] opacity-50
          pointer-events-none
        "
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
