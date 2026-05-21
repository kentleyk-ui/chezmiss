"use client";

import { useState, useRef, useEffect } from "react";

interface LiquidMetalSocialIconProps {
  icon: "instagram" | "facebook" | "tiktok" | "linkedin" | "youtube";
  href: string;
  label: string;
}

const brandColors = {
  instagram: "#E1306C",
  facebook: "#1877F2",
  tiktok: "#000000",
  linkedin: "#0A66C2",
  youtube: "#FF0000",
};

const SocialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162 3.403 0 6.162 2.759 6.162 6.162 0 3.403-2.759 6.162-6.162 6.162-3.403 0-6.162-2.759-6.162-6.162zm2.889 0c0 1.821 1.452 3.273 3.273 3.273 1.821 0 3.273-1.452 3.273-3.273 0-1.821-1.452-3.273-3.273-3.273-1.821 0-3.273 1.452-3.273 3.273zm11.083-6.273c0 .795.645 1.44 1.44 1.44s1.44-.645 1.44-1.44-.645-1.44-1.44-1.44-1.44.645-1.44 1.44z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13v-3.49a5.88 5.88 0 0 0-1-.1A5.9 5.9 0 0 0 5 12.6a5.9 5.9 0 0 0 5.6 5.9 5.88 5.88 0 0 0 5.77-4.3 5.86 5.86 0 0 0 1.7-4.05v-2.34a7.86 7.86 0 0 0 3.39 1.61v-3.48a4.18 4.18 0 0 1-.6-.05z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export function LiquidMetalSocialIcon({ icon, href, label }: LiquidMetalSocialIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shaderMount = useRef<any>(null);

  useEffect(() => {
    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import("@paper-design/shaders");

        if (canvasRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            canvasRef.current.parentElement!,
            liquidMetalFragmentShader,
            {
              u_repetition: 8,
              u_softness: 0.2,
              u_shiftRed: 0.4,
              u_shiftBlue: 0.1,
              u_distortion: isHovered ? 0.3 : 0.1,
              u_contour: 0,
              u_angle: 45,
              u_scale: 15,
              u_shape: 1,
            }
          );
        }
      } catch (err) {
        console.error("Shader loading error:", err);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
      }
    };
  }, [icon, isHovered]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
        {/* Shader Canvas Background */}
        <div className="shader-container-exploded absolute inset-0 rounded-full overflow-hidden">
          <canvas
            ref={canvasRef}
            width={56}
            height={56}
            className="absolute inset-0"
          />
        </div>

        {/* Icon */}
        <div
          className="absolute inset-0 flex items-center justify-center text-white rounded-full z-10 transition-opacity duration-300"
          style={{ color: brandColors[icon] }}
        >
          {SocialIcons[icon]}
        </div>

        {/* Hover Glow */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isHovered
              ? "opacity-100 shadow-lg"
              : "opacity-0"
          }`}
          style={{
            boxShadow: `0 0 20px ${brandColors[icon]}40, 0 0 40px ${brandColors[icon]}20`,
          }}
        />
      </div>
    </a>
  );
}
