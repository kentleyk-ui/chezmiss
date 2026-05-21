"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkle, Zap } from "lucide-react";
import { HolographicCard } from "./holographic-card";
import { LiquidMetalButton } from "./liquid-metal-button";

interface HolographicProductCardProps {
  name: string;
  subtitle: string;
  price: string;
  tag?: string;
  image?: string;
  mockup?: string;
  index: number;
}

export function HolographicProductCard({
  name,
  subtitle,
  price,
  tag,
  image,
  mockup,
  index,
}: HolographicProductCardProps) {
  return (
    <HolographicCard
      className="rounded-2xl overflow-hidden h-full"
      intensity={0.8}
    >
      <div className="relative group rounded-2xl overflow-hidden border border-[#B79A5B]/[0.10] hover:border-[#B79A5B]/40 transition-all duration-500 bg-gradient-to-b from-[#0d0810] to-black touch-manipulation h-full flex flex-col">
        {/* Product showcase area */}
        <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-b from-[#140c12] to-black flex-shrink-0">
          {/* Holographic background glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(183,154,91,0.1) 0%, rgba(240,201,225,0.05) 50%, rgba(183,154,91,0.1) 100%)`,
              backgroundSize: "200% 200%",
            }}
          />

          <div className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 75%, rgba(240,201,225,${0.18 + index*0.04}), transparent 55%), linear-gradient(180deg, rgba(60,30,50,0.3), #000)` }} />

          {/* Central holographic icon with brackets */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Outer bracket glow */}
            <motion.div
              className="absolute w-24 h-24 border-2 border-[#B79A5B]/30 rounded-full"
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Inner bracket glow */}
            <motion.div
              className="absolute w-16 h-16 border-2 border-[#B79A5B]/40 rounded-full"
              animate={{
                scale: [1.05, 0.95, 1.05],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Central icon */}
            <div className="relative z-10 flex items-center justify-center">
              <Zap className="w-12 h-12 text-[#B79A5B] fill-[#B79A5B]" />
            </div>
          </motion.div>

          {/* Product image or placeholder */}
          {image ? (
            <Image
              src={image}
              alt={name}
              width={340}
              height={420}
              className="absolute inset-x-0 bottom-2 mx-auto h-[86%] w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_12px_30px_rgba(183,154,91,0.3)] transition-all duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-end justify-center pb-5">
              <div className="relative w-[98px] h-[132px]">
                <div className="absolute inset-x-0 top-0 mx-auto w-[74px] h-[24px] rounded-[8px] bg-[#171317] border border-[#B79A5B]/40" />
                <div className="absolute inset-x-0 bottom-0 mx-auto w-[92px] h-[92px] rounded-[44px] bg-gradient-to-b from-[#1f1a20] to-[#0c090c] border border-[#B79A5B]/45 shadow-[0_8px_18px_rgba(0,0,0,0.5)]" />
                <div className="absolute inset-x-0 bottom-[40px] mx-auto w-[68px] h-[1px] bg-[#f0c9e1]/35" />
              </div>
            </div>
          )}

          {/* Tag */}
          {tag && (
            <motion.span
              className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.15em] bg-[#B79A5B] text-black px-2 py-0.5 rounded-full font-semibold z-20"
              animate={{
                boxShadow: [
                  "0 0 8px rgba(183, 154, 91, 0.3)",
                  "0 0 16px rgba(183, 154, 91, 0.6)",
                  "0 0 8px rgba(183, 154, 91, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {tag}
            </motion.span>
          )}

          {/* Sparkles */}
          <motion.div
            className="absolute bottom-3 left-3 flex gap-0.5 z-10"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {[...Array(5)].map((_, k) => (
              <Sparkle
                key={k}
                size={8}
                className="text-[#B79A5B] fill-[#B79A5B]"
              />
            ))}
          </motion.div>
        </div>

        {/* Product info */}
        <div className="p-3 sm:p-4 cm-text-glass-soft flex-1 flex flex-col">
          <h3 className="text-[9px] sm:text-[10px] tracking-[0.12em] mb-1 text-[#f0c9e1]/80 font-medium leading-tight">
            {name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-[#f0c9e1]/35 mb-3 flex-1">
            {subtitle}
          </p>
          <div className="flex items-center justify-between gap-1">
            <motion.span
              className="text-[11px] sm:text-[13px] font-semibold text-[#B79A5B]"
              animate={{
                color: ["#B79A5B", "#c9d9a0", "#B79A5B"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {price}
            </motion.span>
            <LiquidMetalButton label="AJOUTER" viewMode="text" onClick={() => {}} />
          </div>
        </div>
      </div>
    </HolographicCard>
  );
}
