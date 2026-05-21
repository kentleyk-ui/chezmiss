"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export function DesktopShortcutInit() {
  const [showNotification, setShowNotification] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [notificationType, setNotificationType] = useState<"copy" | "install">("copy");

  useEffect(() => {
    const hasShown = localStorage.getItem("shortcut_init_shown");

    // Handle Web App Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Handle successful installation
    const handleAppInstalled = () => {
      setShowNotification(false);
      setShowInstallPrompt(false);
      localStorage.setItem("shortcut_init_shown", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Fallback: Copy link to clipboard if install prompt not available
    if (!hasShown && typeof window !== "undefined") {
      // Give browser time to trigger beforeinstallprompt
      const timer = setTimeout(() => {
        if (!showInstallPrompt) {
          // No install prompt, fall back to clipboard copy
          const url = window.location.href.split("?")[0];
          navigator.clipboard.writeText(url).catch(() => {
            console.log("Could not copy to clipboard");
          });

          setNotificationType("copy");
          setShowNotification(true);
          localStorage.setItem("shortcut_init_shown", "true");

          const hideTimer = setTimeout(() => {
            setShowNotification(false);
          }, 4000);

          return () => clearTimeout(hideTimer);
        }
      }, 500);

      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [showInstallPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setShowInstallPrompt(false);
        setShowNotification(true);
        setNotificationType("install");
        localStorage.setItem("shortcut_init_shown", "true");

        setTimeout(() => setShowNotification(false), 4000);
      }

      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setShowNotification(false);
    localStorage.setItem("shortcut_init_shown", "true");
  };

  // Install prompt
  if (showInstallPrompt && deferredPrompt) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col gap-2 bg-[#0d0810] border border-[#B79A5B]/50 rounded-lg px-4 py-4 shadow-lg backdrop-blur max-w-xs">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-[#B79A5B] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[#B79A5B] font-semibold text-sm">Installer CHEZ MISS</p>
              <p className="text-[#f0c9e1]/70 text-xs mt-1">
                Accédez directement depuis votre écran d'accueil
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 px-3 py-2 bg-[#B79A5B] text-black rounded text-xs font-semibold hover:bg-[#B79A5B]/90 transition"
            >
              Installer
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 border border-[#B79A5B]/30 text-[#f0c9e1]/70 rounded text-xs hover:bg-[#B79A5B]/10 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success notification
  if (showNotification) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-3 bg-[#0d0810] border border-[#B79A5B]/50 rounded-lg px-4 py-3 shadow-lg backdrop-blur">
          <CheckCircle className="w-5 h-5 text-[#B79A5B] flex-shrink-0" />
          <div className="text-sm">
            <p className="text-[#B79A5B] font-semibold">
              {notificationType === "install"
                ? "Application installée ! 🎉"
                : "Lien copié ! 📋"}
            </p>
            <p className="text-[#f0c9e1]/70 text-xs">
              {notificationType === "install"
                ? "Retrouvez CHEZ MISS sur votre écran d'accueil"
                : "Vous pouvez créer un raccourci sur votre bureau"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

