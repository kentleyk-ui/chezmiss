"use client";

import dynamic from "next/dynamic";
import { GoldThemeProvider } from "@/hooks/useGoldTheme";
import { ReactNode } from "react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";

const GoldTester = dynamic(() => import("@/components/GoldTester").then(mod => ({ default: mod.GoldTester })), {
  ssr: false,
});

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <GoldThemeProvider>
      <div className="fixed top-4 inset-x-4 z-[70] pointer-events-none flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-[#B79A5B]/20 bg-black/55 px-3 py-2 shadow-[0_0_30px_rgba(183,154,91,0.12)] backdrop-blur-2xl">
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.28em] text-[#f0c9e1]/55">
            Navigation globale
          </span>
          <LiquidMetalButton
            label="Actualiser"
            onClick={() => {
              window.location.reload();
            }}
          />
        </div>
      </div>
      {children}
      <GoldTester />
    </GoldThemeProvider>
  );
}
