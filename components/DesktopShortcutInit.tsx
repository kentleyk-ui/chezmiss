"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export function DesktopShortcutInit() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check if it's first load
    const hasShown = localStorage.getItem("shortcut_init_shown");

    if (!hasShown && typeof window !== "undefined") {
      // Copy link to clipboard
      const url = window.location.href.split("?")[0]; // Get base URL
      navigator.clipboard.writeText(url).catch(() => {
        // Fallback if clipboard fails
        console.log("Could not copy to clipboard");
      });

      setShowNotification(true);
      localStorage.setItem("shortcut_init_shown", "true");

      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 bg-[#0d0810] border border-[#B79A5B]/50 rounded-lg px-4 py-3 shadow-lg backdrop-blur">
        <CheckCircle className="w-5 h-5 text-[#B79A5B] flex-shrink-0" />
        <div className="text-sm">
          <p className="text-[#B79A5B] font-semibold">Lien copié ! 📋</p>
          <p className="text-[#f0c9e1]/70 text-xs">
            Vous pouvez créer un raccourci sur votre bureau
          </p>
        </div>
      </div>
    </div>
  );
}
