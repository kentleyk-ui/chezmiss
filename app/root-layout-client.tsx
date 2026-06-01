"use client";

import { GoldThemeProvider } from "@/hooks/useGoldTheme";
import { ReactNode } from "react";

export function RootLayoutClient({ children }: { children: ReactNode }) {
  return (
    <GoldThemeProvider>
      {children}
    </GoldThemeProvider>
  );
}
