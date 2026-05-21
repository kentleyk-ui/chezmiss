"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type GoldTheme = "default" | "champagne" | "rose-gold" | "royal-satin" | "deep-luxe";

interface GoldThemeContextType {
  theme: GoldTheme;
  setTheme: (theme: GoldTheme) => void;
  goldColor: string;
}

const GoldThemeContext = createContext<GoldThemeContextType | undefined>(undefined);

const GOLD_COLORS: Record<GoldTheme, string> = {
  default: "#B79A5B",
  champagne: "#F7E7CE",
  "rose-gold": "#E6B7A9",
  "royal-satin": "#C9A86A",
  "deep-luxe": "#B8860B",
};

const GOLD_NAMES: Record<GoldTheme, string> = {
  default: "Gold Cashmere #B79A5B",
  champagne: "Champagne Gold #F7E7CE",
  "rose-gold": "Rose Gold Soft #E6B7A9",
  "royal-satin": "Royal Satin Gold #C9A86A",
  "deep-luxe": "Deep Luxe Gold #B8860B",
};

export function GoldThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<GoldTheme>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("goldTheme") as GoldTheme | null;
    if (savedTheme && GOLD_COLORS[savedTheme]) {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const oldColor = "#B79A5B";
    const newColor = GOLD_COLORS[theme];

    // Update CSS variable
    document.documentElement.style.setProperty("--gold-primary", newColor);
    localStorage.setItem("goldTheme", theme);

    // Create/Update dynamic style
    const styleId = "dynamic-gold-theme";
    let style = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    // Generate CSS that replaces the old color with the new one
    const cssRules = `
      :root {
        --gold-primary: ${newColor};
      }

      /* Global replacement of #B79A5B with dynamic color */
      [style*="#B79A5B"],
      [class*="text-\\[#B79A5B"],
      [class*="bg-\\[#B79A5B"],
      [class*="border-\\[#B79A5B"],
      [class*="from-\\[#B79A5B"],
      [class*="to-\\[#B79A5B"],
      [class*="via-\\[#B79A5B"] {
        --gold-override: ${newColor};
      }

      /* Dynamic fill for SVG and other elements */
      .text-\\[#B79A5B\\],
      \\[color\\*=\\\"#B79A5B\\\"\\] {
        color: ${newColor} !important;
      }

      .bg-\\[#B79A5B\\],
      \\[background-color\\*=\\\"#B79A5B\\\"\\] {
        background-color: ${newColor} !important;
      }

      .border-\\[#B79A5B\\],
      \\[border-color\\*=\\\"#B79A5B\\\"\\] {
        border-color: ${newColor} !important;
      }

      /* Shadow effects with new color */
      [class*="shadow\\[0_0_"] {
        --gold-shadow: ${newColor};
      }

      /* Hover states */
      .hover\\:text-\\[#B79A5B\\/\\]:hover,
      .hover\\:border-\\[#B79A5B\\/\\]:hover {
        color: ${newColor} !important;
        border-color: ${newColor} !important;
      }
    `;

    style.textContent = cssRules;

    // Also update any inline styles containing the old color
    const updateElement = (el: Element) => {
      if (el.getAttribute("style")) {
        const newStyle = el.getAttribute("style")!.replace(new RegExp(oldColor, "g"), newColor);
        el.setAttribute("style", newStyle);
      }
      el.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          updateElement(child as Element);
        }
      });
    };

    // Update document elements
    updateElement(document.documentElement);
  }, [theme, mounted]);

  const setTheme = (newTheme: GoldTheme) => {
    setThemeState(newTheme);
  };

  if (!mounted) {
    return children;
  }

  return (
    <GoldThemeContext.Provider value={{ theme, setTheme, goldColor: GOLD_COLORS[theme] }}>
      {children}
    </GoldThemeContext.Provider>
  );
}

export function useGoldTheme() {
  const context = useContext(GoldThemeContext);
  if (!context) {
    throw new Error("useGoldTheme must be used within GoldThemeProvider");
  }
  return context;
}

export { GOLD_COLORS, GOLD_NAMES };
