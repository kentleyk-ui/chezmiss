"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function HolographicCard({
  children,
  className = "",
  intensity = 1,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * 12 * intensity;
    const rotY = ((x - centerX) / centerX) * 12 * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d" as const,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full h-full"
      >
        {/* Corner brackets L-shape */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {/* Top-left */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#B79A5B]/60" />
          {/* Top-right */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#B79A5B]/60" />
          {/* Bottom-left */}
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#B79A5B]/60" />
          {/* Bottom-right */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#B79A5B]/60" />
        </div>

        {/* Double scanlines */}
        {isHovering && (
          <>
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
              animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(183, 154, 91, 0.15) 0px, rgba(183, 154, 91, 0.15) 1px, transparent 1px, transparent 3px)",
              }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
              animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(240, 201, 225, 0.08) 0px, rgba(240, 201, 225, 0.08) 2px, transparent 2px, transparent 4px)",
              }}
            />
          </>
        )}

        {/* Holographic glow */}
        {isHovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(183, 154, 91, 0.3), inset 0 0 20px rgba(183, 154, 91, 0.1)",
                "0 0 40px rgba(183, 154, 91, 0.5), inset 0 0 30px rgba(183, 154, 91, 0.2)",
                "0 0 20px rgba(183, 154, 91, 0.3), inset 0 0 20px rgba(183, 154, 91, 0.1)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {children}
      </motion.div>
    </div>
  );
}
