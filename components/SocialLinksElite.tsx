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
    <svg viewBox="0 0 48 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="igGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="50%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#8134af" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#igGrad)" />
      <circle cx="24" cy="24" r="9" fill="#fff" opacity="0.12" />
      <path d="M24 19.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" fill="#fff" />
      <circle cx="33" cy="15" r="2" fill="#fff" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 48 48" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 10c-1.1 0-2 .9-2 2v8.6c0 3.3-2.7 6-6 6-1.4 0-2.7-.5-3.7-1.4v4.3c1.4 1.1 3.2 1.8 5 1.8 5 0 9-4 9-9V14h3c0-2.8-2.2-5-5-5z" fill="#010101" />
      <path d="M30 10v2.7a6 6 0 0 0 2 .3v-3a1 1 0 0 0-1-1h-1z" fill="#25F4EE" />
      <path d="M24 34c-1.4 0-2.7-.5-3.7-1.4v-4.3c1 .8 2.3 1.4 3.7 1.4 3.3 0 6-2.7 6-6V16.8h3c0 5-4 9-9 9-1.4 0-2.7-.5-3.7-1.4V34z" fill="#FE2C55" />
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
      href: "https://www.instagram.com/chezmiss?igsh=Y293ZDU4bDhkeG56",
      label: "Instagram - CHEZ MISS",
      color: "from-pink-500 via-red-500 to-orange-400",
    },
    {
      icon: SocialIcons.tiktok,
      href: "https://www.tiktok.com/@chezmiss?_r=1&_t=ZS-96prJTENC4H",
      label: "TikTok - CHEZ MISS",
      color: "from-black via-gray-800 to-black",
    },
    {
      icon: SocialIcons.instagram,
      href: "https://www.instagram.com/dolls.mafia.official?igsh=MXZhbmNoY3poZ2NiMA==",
      label: "Instagram - Dolls Mafia",
      color: "from-pink-500 via-red-500 to-orange-400",
    },
    {
      icon: SocialIcons.tiktok,
      href: "https://www.tiktok.com/@dolls.mafia.official?_r=1&_t=ZS-96prX384gZk",
      label: "TikTok - Dolls Mafia",
      color: "from-black via-gray-800 to-black",
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
