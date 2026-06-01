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
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path fill="currentColor" d="M12.5 3v5.6a3.9 3.9 0 1 0 3.9 3.9V6.4h2.1V3h-6z" />
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
      color: "#E1306C",
    },
    {
      icon: SocialIcons.tiktok,
      href: "https://www.tiktok.com/@chezmiss?_r=1&_t=ZS-96prJTENC4H",
      label: "TikTok - CHEZ MISS",
      color: "#000000",
    },
    {
      icon: SocialIcons.instagram,
      href: "https://www.instagram.com/dolls.mafia.official?igsh=MXZhbmNoY3poZ2NiMA==",
      label: "Instagram - Dolls Mafia",
      color: "#E1306C",
    },
    {
      icon: SocialIcons.tiktok,
      href: "https://www.tiktok.com/@dolls.mafia.official?_r=1&_t=ZS-96prX384gZk",
      label: "TikTok - Dolls Mafia",
      color: "#000000",
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
            className="group"
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 shadow-sm border border-white/6`}
              style={{ background: 'transparent', color: '#B79A5B' }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                {social.icon}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
