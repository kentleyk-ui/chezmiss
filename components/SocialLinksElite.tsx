"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  color: string;
}

const SocialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="currentColor" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13v-3.49a5.88 5.88 0 0 0-1-.1A5.9 5.9 0 0 0 5 12.6a5.9 5.9 0 0 0 5.6 5.9 5.88 5.88 0 0 0 5.77-4.3 5.86 5.86 0 0 0 1.7-4.05v-2.34a7.86 7.86 0 0 0 3.39 1.61v-3.48a4.18 4.18 0 0 1-.6-.05z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export function SocialLinksElite() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const socialLinks: SocialLink[] = [
    {
      icon: SocialIcons.instagram,
      href: "https://instagram.com/chezmiss",
      label: "Instagram",
      color: "from-pink-500 via-red-500 to-orange-400",
    },
    {
      icon: SocialIcons.facebook,
      href: "https://facebook.com/chezmiss",
      label: "Facebook",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: SocialIcons.tiktok,
      href: "https://tiktok.com/chezmiss",
      label: "TikTok",
      color: "from-black via-gray-800 to-black",
    },
    {
      icon: SocialIcons.linkedin,
      href: "https://linkedin.com/company/chezmiss",
      label: "LinkedIn",
      color: "from-blue-700 to-blue-900",
    },
    {
      icon: SocialIcons.youtube,
      href: "https://youtube.com/chezmiss",
      label: "YouTube",
      color: "from-red-600 to-red-800",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      className="flex justify-center gap-6 sm:gap-8 flex-wrap"
    >
      {socialLinks.map((social) => (
        <motion.div key={social.label} variants={item}>
          <Link
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group relative"
            onMouseEnter={() => setHoveredId(social.label)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Outer Glow Effect */}
            <motion.div
              animate={{
                opacity: hoveredId === social.label ? 1 : 0.4,
                scale: hoveredId === social.label ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`absolute -inset-4 rounded-full blur-xl bg-gradient-to-r ${social.color} opacity-30 group-hover:opacity-50 transition-all duration-300`}
            />

            {/* Main Icon Container */}
            <div
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300`}
              style={{
                background: `linear-gradient(135deg, ${social.color.split(" ")[1]}, ${social.color.split(" ")[3]})`,
              }}
            >
              {/* Animated Background Grid */}
              <motion.div
                animate={
                  hoveredId === social.label
                    ? { backgroundPosition: ["0% 0%", "100% 100%"] }
                    : {}
                }
                transition={{
                  duration: 6,
                  repeat: hoveredId === social.label ? Infinity : 0,
                  ease: "linear",
                }}
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
                  backgroundSize: "200% 200%",
                }}
              />

              {/* Glass Morphism Layer */}
              <div className="absolute inset-0 rounded-full backdrop-blur-sm bg-white/5 border border-white/10" />

              {/* Icon Container */}
              <motion.div
                animate={{
                  rotate: hoveredId === social.label ? 360 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg"
              >
                {social.icon}
              </motion.div>

              {/* Inner Glow */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Animated Border */}
              <motion.div
                animate={{
                  opacity: hoveredId === social.label ? [0.3, 0.8, 0.3] : 0.2,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-white/40"
              />

              {/* Shimmer Effect on Hover */}
              {hoveredId === social.label && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              )}
            </div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hoveredId === social.label ? 1 : 0,
                y: hoveredId === social.label ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-[#B79A5B] pointer-events-none"
            >
              {social.label}
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
