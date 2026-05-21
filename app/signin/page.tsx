"use client";

import Link from "next/link";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import { ChezmissAide } from "@/components/ChezmissAide";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function SignIn() {
  return (
    <main className="cm-marble cm-page-enter min-h-screen text-[#f8edf3] overflow-x-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 backdrop-blur-sm bg-black/40 pointer-events-none"
      />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 pointer-events-auto w-full max-w-md"
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
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#B79A5B]/10 transition-colors"
              >
                <X size={20} className="text-[#f0c9e1]/60" />
              </motion.button>
            </Link>

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
              className="text-center mb-8"
            >
              <h1 className="text-2xl font-bold text-[#B79A5B] mb-2">
                Se Connecter
              </h1>
              <p className="text-[#f0c9e1]/70 text-sm">
                Accédez à votre compte CHEZ MISS
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className="block text-xs text-[#B79A5B]/70 mb-2 font-semibold tracking-wider">
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/60 border border-[#B79A5B]/30 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/60 focus:ring-1 focus:ring-[#B79A5B]/30 backdrop-blur-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs text-[#B79A5B]/70 mb-2 font-semibold tracking-wider">
                  MOT DE PASSE
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/60 border border-[#B79A5B]/30 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/60 focus:ring-1 focus:ring-[#B79A5B]/30 backdrop-blur-sm transition-all"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-3 pt-4"
              >
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Authentification en développement");
                  }}
                  className="w-full flex justify-center"
                >
                  <LiquidMetalButton label="Se Connecter" />
                </button>
                <Link href="/" className="w-full flex justify-center">
                  <LiquidMetalButton label="Retour" viewMode="text" onClick={() => {}} />
                </Link>
              </motion.div>
            </motion.form>

            {/* Divider */}
            <div className="mt-6 pt-6 border-t border-[#B79A5B]/20" />

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center mt-6"
            >
              <p className="text-xs text-[#f0c9e1]/60">
                Pas encore de compte ?{" "}
                <Link href="/signup" className="text-[#B79A5B] hover:text-[#B79A5B]/80 font-semibold transition">
                  Créer un compte
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ChezmissAide />
    </main>
  );
}
