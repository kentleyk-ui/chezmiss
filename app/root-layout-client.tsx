"use client";

import dynamic from "next/dynamic";
import { GoldThemeProvider } from "@/hooks/useGoldTheme";
import { ReactNode } from "react";

const GoldTester = dynamic(() => import("@/components/GoldTester").then(mod => ({ default: mod.GoldTester })), {
  ssr: false,
});

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <GoldThemeProvider>
      {children}
      <GoldTester />
    </GoldThemeProvider>
  );
}
