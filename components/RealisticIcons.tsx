import React from 'react';
import { motion } from 'framer-motion';

export const DiamondIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} whileHover={{ scale: 1.1 }}>
    <defs>
      <linearGradient id="diamondGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" stopOpacity="1" />
        <stop offset="50%" stopColor="#B79A5B" stopOpacity="1" />
        <stop offset="100%" stopColor="#9d7e47" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="diamondGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f0c9e1" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#B79A5B" stopOpacity="0.3" />
      </linearGradient>
      <filter id="diamondShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Top pyramid */}
    <polygon points="50,15 70,45 50,40 30,45" fill="url(#diamondGrad1)" filter="url(#diamondShadow)" />
    {/* Middle diamond */}
    <polygon points="30,45 50,40 70,45 50,65" fill="url(#diamondGrad2)" opacity="0.9" />
    {/* Bottom pyramid */}
    <polygon points="50,65 70,45 50,90 30,45" fill="#9d7e47" opacity="0.7" />
    {/* Shine effect */}
    <ellipse cx="45" cy="50" rx="8" ry="12" fill="#f0c9e1" opacity="0.4" />
  </motion.svg>
);

export const CrownIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} whileHover={{ scale: 1.1 }}>
    <defs>
      <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" stopOpacity="1" />
        <stop offset="50%" stopColor="#B79A5B" stopOpacity="1" />
        <stop offset="100%" stopColor="#9d7e47" stopOpacity="1" />
      </linearGradient>
      <filter id="crownShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Crown band */}
    <path d="M 20 60 L 30 35 L 40 50 L 50 25 L 60 50 L 70 35 L 80 60 Z" fill="url(#crownGrad)" filter="url(#crownShadow)" />
    {/* Base band */}
    <rect x="15" y="60" width="70" height="12" rx="2" fill="url(#crownGrad)" opacity="0.9" />
    {/* Jewels */}
    <circle cx="30" cy="37" r="4" fill="#f0c9e1" opacity="0.8" />
    <circle cx="50" cy="25" r="5" fill="#f0c9e1" />
    <circle cx="70" cy="37" r="4" fill="#f0c9e1" opacity="0.8" />
    {/* Shine */}
    <rect x="20" y="63" width="60" height="2" fill="#f0c9e1" opacity="0.5" />
  </motion.svg>
);

export const TruckIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} whileHover={{ scale: 1.1 }}>
    <defs>
      <linearGradient id="truckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" stopOpacity="1" />
        <stop offset="50%" stopColor="#B79A5B" stopOpacity="1" />
        <stop offset="100%" stopColor="#9d7e47" stopOpacity="1" />
      </linearGradient>
      <filter id="truckShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Cabin */}
    <rect x="10" y="35" width="25" height="35" rx="3" fill="url(#truckGrad)" filter="url(#truckShadow)" />
    {/* Cabin window */}
    <rect x="14" y="40" width="12" height="12" rx="1" fill="#f0c9e1" opacity="0.6" />
    {/* Cargo bed */}
    <rect x="35" y="40" width="50" height="30" rx="2" fill="url(#truckGrad)" opacity="0.85" />
    {/* Wheels */}
    <circle cx="20" cy="72" r="5" fill="#9d7e47" />
    <circle cx="75" cy="72" r="5" fill="#9d7e47" />
    {/* Wheel shine */}
    <circle cx="20" cy="72" r="3" fill="#B79A5B" opacity="0.6" />
    <circle cx="75" cy="72" r="3" fill="#B79A5B" opacity="0.6" />
    {/* Bumper shine */}
    <rect x="10" y="67" width="65" height="2" fill="#f0c9e1" opacity="0.4" />
  </motion.svg>
);

export const LockIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <motion.svg viewBox="0 0 100 100" className={className} whileHover={{ scale: 1.1 }}>
    <defs>
      <linearGradient id="lockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d4a574" stopOpacity="1" />
        <stop offset="50%" stopColor="#B79A5B" stopOpacity="1" />
        <stop offset="100%" stopColor="#9d7e47" stopOpacity="1" />
      </linearGradient>
      <filter id="lockShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Shackle top */}
    <path d="M 35 45 Q 35 25 50 25 Q 65 25 65 45" stroke="url(#lockGrad)" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#lockShadow)" />
    {/* Body */}
    <rect x="25" y="40" width="50" height="45" rx="3" fill="url(#lockGrad)" filter="url(#lockShadow)" />
    {/* Keyhole */}
    <circle cx="50" cy="62" r="5" fill="#9d7e47" opacity="0.7" />
    {/* Shine on top */}
    <rect x="28" y="42" width="44" height="3" fill="#f0c9e1" opacity="0.5" rx="1" />
    {/* Shine on shackle */}
    <path d="M 38 35 Q 38 30 50 30 Q 60 30 62 38" stroke="#f0c9e1" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
  </motion.svg>
);
