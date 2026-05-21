"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export function DesktopShortcutInit() {
  const [showNotification, setShowNotification] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [notificationType, setNotificationType] = useState<"copy" | "install">("copy");

  useEffect(() => {
    const hasShown = localStorage.getItem("shortcut_init_shown");
    const dontShow = localStorage.getItem("shortcut_init_dont_show_again");

    // Handle Web App Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      if (!dontShow) {
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShowInstallPrompt(true);
      }
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
    if (!hasShown && !dontShow && typeof window !== "undefined") {
      const timer = setTimeout(() => {
        if (!showInstallPrompt) {
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
    if (dontShowAgain) {
      localStorage.setItem("shortcut_init_dont_show_again", "true");
    }
  };

  // Install prompt - Glass morphism centered modal
  if (showInstallPrompt && deferredPrompt) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-sm bg-black/20 pointer-events-auto"
            onClick={handleDismiss}
          />

          {/* Main Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 pointer-events-auto w-80 pointer-events-auto"
          >
            {/* Glass Container */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Glassmorphism Background */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, rgba(13, 8, 16, 0.5) 0%, rgba(26, 10, 18, 0.3) 100%)`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(183, 154, 91, 0.15)",
                }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#B79A5B]/10 via-transparent to-transparent pointer-events-none" />

              {/* Content */}
              <div className="relative p-8 pt-12">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#B79A5B]/10 transition-colors"
                >
                  <X size={20} className="text-[#f0c9e1]/60" />
                </motion.button>

                {/* Logo - Centered, subtle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 pointer-events-none"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo-heart-192.png"
                      alt="CHEZ MISS"
                      fill
                      className="object-contain opacity-20"
                    />
                  </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-center mb-6"
                >
                  <h3 className="text-xl font-bold text-[#B79A5B] mb-2">
                    Installer CHEZ MISS
                  </h3>
                  <p className="text-[#f0c9e1]/70 text-sm">
                    Accédez directement depuis votre écran d'accueil
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="space-y-3 mb-4"
                >
                  <button
                    onClick={handleInstallClick}
                    className="w-full px-4 py-3 bg-gradient-to-r from-[#B79A5B] to-[#c8a76b] text-black font-bold rounded-xl hover:from-[#B79A5B]/90 hover:to-[#c8a76b]/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Download size={16} className="inline mr-2" />
                    Installer
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="w-full px-4 py-2 bg-[#B79A5B]/10 hover:bg-[#B79A5B]/20 text-[#f0c9e1]/70 font-semibold rounded-xl border border-[#B79A5B]/30 transition-all duration-200"
                  >
                    Plus tard
                  </button>
                </motion.div>

                {/* Checkbox - Don't show again */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#B79A5B]/5 transition-colors cursor-pointer"
                  onClick={() => setDontShowAgain(!dontShowAgain)}
                >
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded cursor-pointer accent-[#B79A5B]"
                  />
                  <label className="text-xs text-[#f0c9e1]/50 cursor-pointer flex-1">
                    Ne plus afficher
                  </label>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Success notification - Compact bottom
  if (showNotification) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        >
          <div
            className="flex items-center gap-3 px-6 py-4 rounded-full backdrop-blur-md border border-[#B79A5B]/30"
            style={{
              background: `linear-gradient(135deg, rgba(13, 8, 16, 0.8) 0%, rgba(26, 10, 18, 0.6) 100%)`,
              boxShadow: "0 8px 32px rgba(183, 154, 91, 0.15)",
            }}
          >
            <CheckCircle size={20} className="text-[#B79A5B] flex-shrink-0" />
            <div className="text-sm">
              <p className="text-[#B79A5B] font-semibold">
                {notificationType === "install"
                  ? "Application installée ! 🎉"
                  : "Lien copié ! 📋"}
              </p>
              <p className="text-[#f0c9e1]/60 text-xs">
                {notificationType === "install"
                  ? "Retrouvez CHEZ MISS sur votre écran d'accueil"
                  : "Vous pouvez créer un raccourci sur votre bureau"}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}
