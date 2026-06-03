"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import { DesktopShortcutInit } from "@/components/DesktopShortcutInit";
import { SocialLinksElite } from "@/components/SocialLinksElite";
import { ChezmissAide } from "@/components/ChezmissAide";
import { useLazyLoad } from "@/lib/performance";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import Link from "next/link";
import { Alex_Brush } from "next/font/google";
import { DiamondIcon, CrownIcon, TruckIcon, LockIcon } from "@/components/RealisticIcons";
import { ScanSearch, Menu, X } from "lucide-react";

const titleScript = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMileleTooltip, setShowMileleTooltip] = useState(false);
  const [isNewsletterLoaded, setIsNewsletterLoaded] = useState(false);
  const { t, isClient } = useLanguage();
  const newsletterRef = useRef<HTMLDivElement>(null);

  useLazyLoad(newsletterRef as React.RefObject<HTMLElement>, () => setIsNewsletterLoaded(true));
  
  const navItems = [
    { label: "ACCUEIL", href: "#accueil" },
    { label: "À PROPOS", href: "/a-propos" },
    { label: "BOUTIQUE", href: "/boutique" },
    { label: "CONTACT", href: "#contact" },
  ];

  const values = [
    { icon: DiamondIcon, title: "QUALITE SUPERIEURE", description: "Des ingrédients haut de gamme pour des résultats exceptionnels et professionnels.", number: "01" },
    { icon: CrownIcon, title: "EXPERTISE & PASSION", description: "Des produits élaborés par des experts passionnés pour mettre en lumière la splendeur de la beauté.", number: "02" },
    { icon: TruckIcon, title: "LIVRAISON RAPIDE", description: "Livraison rapide partout au canada, efficace et sécuritaire. (des frais additionnels peuvent s'appliquer dans certains cas)", number: "03" },
    { icon: LockIcon, title: "SATISFAIT OU REMBOURSE", description: "Paiement sécurisé, Transaction 100% chiffrés de bout en bout, Modes de paiements sûrs et protégés.", number: "04" },
  ];

  const products = [
    { name: "WHIPPED CREAM CLEANSER", subtitle: "Nettoyant creme fouettee", price: "29,90 $ CA", tag: "BESTSELLER", image: "/whipped-cream-cleanser.png", mockup: "tube" },
    { name: "LASH SETTING SPRAY", subtitle: "Spray fixateur", price: "25,90 $ CA", tag: "NOUVEAU", image: "/lash-setting-spray.png", mockup: "spray" },
    { name: "LASH PRIMER", subtitle: "Appret pour cils", price: "23,90 $ CA", tag: null, image: "/lash-primer.png", mockup: "dropper" },
    { name: "PREMIUM BONDER", subtitle: "Accelerateur de sechage", price: "23,90 $ CA", tag: "PRO", image: "/premium-bonder.png", mockup: "dropper" },
    { name: "CREAM REMOVER", subtitle: "Dissolvant en creme", price: "21,90 $ CA", tag: null, image: null, mockup: "jar" },
  ];

  return (
    <main className="cm-marble cm-page-enter min-h-screen text-[#f8edf3] overflow-x-hidden">

      {/* TOP STRIP */}
      <div className="relative z-30 border-b border-[#B79A5B]/25 bg-gradient-to-r from-[#1a0a12] via-[#f0c9e1]/8 to-[#1a0a12] text-center text-[11px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.32em] py-3 sm:py-3.5 text-[#f0c9e1]/95 font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center overflow-hidden">
          <span className="inline-flex items-center gap-3 sm:gap-4">
            <span className="hidden xs:block w-8 sm:w-10 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/50 to-transparent" />
            <span className="whitespace-nowrap">ACT LIKE A LADY</span>

            {/* Animated Eyes Ball — Futuristic Luxury */}
            <motion.span
              className="relative w-5 h-5 sm:w-7 sm:h-7 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
              style={{
                border: "1.5px solid rgba(183,154,91,0.7)"
              }}
              animate={{
                y: [0, -5, 0],
                rotateZ: [0, 360]
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              whileHover={{
                scale: 1.25,
                boxShadow: "0 0 40px rgba(183,154,91,0.6), 0 0 80px rgba(240,201,225,0.4), inset 0 0 20px rgba(183,154,91,0.3)"
              }}
            >
              <Image
                src="/eyes.png.jpeg"
                alt="Eyes accent"
                fill
                sizes="28px"
                className="object-cover object-center"
                priority
              />
              {/* Holographic overlay */}
              <span className="absolute inset-0 bg-gradient-to-br from-[#B79A5B]/30 via-transparent to-[#d4a574]/20" />

              {/* Animated scan lines */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#B79A5B]/40 to-transparent"
                animate={{ y: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Glow breathing effect — luxury futuristic */}
              <motion.span
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "inset 0 0 8px rgba(183,154,91,0.25), 0 0 20px rgba(183,154,91,0.35)",
                    "inset 0 0 16px rgba(183,154,91,0.5), 0 0 40px rgba(183,154,91,0.7)",
                    "inset 0 0 8px rgba(183,154,91,0.25), 0 0 20px rgba(183,154,91,0.35)"
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.span>

            <span className="whitespace-nowrap">LASH LIKE A BOSS</span>
            <span className="hidden xs:block w-8 sm:w-10 h-px bg-gradient-to-l from-transparent via-[#B79A5B]/50 to-transparent" />
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#B79A5B]/15 bg-black/80 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 lg:h-18 flex items-center justify-between gap-2 sm:gap-6 relative overflow-visible">
          <div className="flex items-center gap-3 shrink-0 relative -top-0.5 sm:-top-1 pl-0.5">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/logo-chezmiss.png"
                alt="CHEZ MISS"
                width={1528}
                height={354}
                priority
                className="cm-logo-gold h-9 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_0_24px_rgba(183,154,91,0.45)]"
              />
            </motion.div>
          </div>
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                <LiquidMetalButton label={item.label} />
              </a>
            ))}
          </nav>

          {/* Mobile menu button — 44px touch target */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 grid place-items-center rounded-full border border-[#B79A5B]/20 bg-[#B79A5B]/[0.08] text-[#f0c9e1]/60 active:text-[#B79A5B] active:bg-[#B79A5B]/[0.18] hover:text-[#B79A5B] hover:bg-[#B79A5B]/[0.12] transition-all duration-300 mr-auto ml-1 touch-manipulation"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              type="button"
              className="w-11 h-11 grid place-items-center rounded-full border border-[#B79A5B]/20 bg-[#B79A5B]/[0.08] text-[#f0c9e1]/60 hover:text-[#B79A5B] hover:bg-[#B79A5B]/[0.12] active:bg-[#B79A5B]/[0.18] transition-all duration-300 touch-manipulation"
              aria-label="Recherche"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScanSearch size={16} />
            </motion.button>
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/signin">
                <LiquidMetalButton label="Se connecter" />
              </Link>
              <Link href="/signup">
                <LiquidMetalButton label="Créer un compte" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu — full overlay avec grands touch targets */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-[#B79A5B]/[0.15] shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
          >
            <nav className="flex flex-col items-center gap-3 py-8 px-5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-3xl border border-[#B79A5B]/25 bg-[#10050d]/95 px-5 py-4 text-center text-sm font-semibold tracking-[0.22em] uppercase text-[#f0c9e1] transition-all duration-300 hover:bg-[#B79A5B]/15 active:bg-[#B79A5B]/20 touch-manipulation"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 w-20 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/30 to-transparent" />
              <div className="flex flex-col items-center gap-3 mt-4 w-full">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-3xl border border-[#B79A5B]/25 bg-[#B79A5B]/[0.15] px-5 py-4 text-center text-sm font-semibold text-[#f0c9e1] transition-all duration-300 hover:bg-[#B79A5B]/25 active:bg-[#B79A5B]/30 touch-manipulation"
                >
                  Se connecter
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full rounded-3xl border border-[#B79A5B]/25 bg-[#B79A5B]/[0.12] px-5 py-4 text-center text-sm font-semibold text-[#f0c9e1] transition-all duration-300 hover:bg-[#B79A5B]/20 active:bg-[#B79A5B]/25 touch-manipulation"
                >
                  Créer un compte
                </Link>
              </div>
              <p className="text-[10px] tracking-[0.28em] text-[#f0c9e1]/30 mt-6 font-light">CHEZ MISS</p>
            </nav>
          </motion.div>
        )}
      </header>

      {/* HERO */}
      <section id="accueil" className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(240,201,225,0.12)_0%,transparent_65%)]" />
          <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(183,154,91,0.09)_0%,transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-[#B79A5B]/15 to-transparent rotate-12" />
        </div>
        <div className="absolute top-3 sm:top-5 left-4 sm:left-8 lg:left-10">
          <div 
            className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.22em] sm:tracking-[0.3em] text-[#B79A5B] rounded-full px-3 sm:px-4 py-1 sm:py-1.5 bg-[#B79A5B]/5"
            style={{
              border: "1px solid rgba(183,154,91,0.35)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), 0 0 12px rgba(183,154,91,0.15)",
              textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 0 8px rgba(183,154,91,0.3)",
            }}
          >
            LUXE · BEAUTÉ · CONFIANCE
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-8 sm:pt-12 pb-8 flex flex-col gap-8 sm:gap-10">
          {/* TITRE COLLECTION */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <p className="text-[9px] sm:text-[11px] lg:text-[12px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#B79A5B]/60 mb-2 sm:mb-3 font-medium">
              Présentation des nouveaux produits
            </p>
            <h2 className="text-[clamp(1.4rem,4vw,2.6rem)] font-light uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#f8edf3] drop-shadow-[0_2px_20px_rgba(0,0,0,0.32)]">
              Notre toute nouvelle collection
            </h2>
          </motion.div>

          {/* SECTION PRINCIPALE — Palette + Info Card (côte à côte) + Photo (dessous) */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {/* RANGÉE HAUTE — Palette + Info Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

              {/* BLOC GAUCHE — Palette texte */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-col items-center justify-center gap-8"
              >
                {/* Palette "Révélez votre Élégance" */}
                <div className="flex flex-col items-center gap-6">
                  {/* Palette de couleurs — Luxury Futuristic */}
                  <div className="flex gap-3 relative">
                    {/* Holographic background */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#B79A5B]/10 via-[#d4a574]/10 to-[#B79A5B]/10 rounded-full blur-2xl" />

                    <motion.div
                      whileHover={{ scale: 1.4, y: -8 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(183,154,91,0.4), 0 0 40px rgba(183,154,91,0.2)",
                          "0 0 35px rgba(183,154,91,0.7), 0 0 60px rgba(183,154,91,0.4)",
                          "0 0 20px rgba(183,154,91,0.4), 0 0 40px rgba(183,154,91,0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-[#B79A5B] to-[#9d7e47] border border-[#B79A5B]/70 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
                      <div className="absolute inset-0.5 rounded-full border border-[#B79A5B]/50" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-[#B79A5B]/30 to-transparent"
                        animate={{ y: [-20, 20] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.4, y: -8 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(240,201,225,0.35), 0 0 40px rgba(240,201,225,0.18)",
                          "0 0 35px rgba(240,201,225,0.6), 0 0 60px rgba(240,201,225,0.35)",
                          "0 0 20px rgba(240,201,225,0.35), 0 0 40px rgba(240,201,225,0.18)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                      className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-[#f0c9e1] to-[#e8b8d0] border border-[#f0c9e1]/60 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                      <div className="absolute inset-0.5 rounded-full border border-[#f0c9e1]/50" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-[#f0c9e1]/30 to-transparent"
                        animate={{ y: [-20, 20] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.4, y: -8 }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(212,165,116,0.4), 0 0 40px rgba(212,165,116,0.2)",
                          "0 0 35px rgba(212,165,116,0.65), 0 0 60px rgba(212,165,116,0.35)",
                          "0 0 20px rgba(212,165,116,0.4), 0 0 40px rgba(212,165,116,0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-[#d4a574] to-[#c89463] border border-[#d4a574]/70 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/22 to-transparent" />
                      <div className="absolute inset-0.5 rounded-full border border-[#d4a574]/50" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-[#d4a574]/30 to-transparent"
                        animate={{ y: [-20, 20] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                      />
                    </motion.div>
                  </div>

                  {/* Texte script */}
                  <h1 className={`${titleScript.className} font-normal leading-tight tracking-wider text-center`}>
                    <motion.span
                      className="block text-[clamp(2.2rem,5vw,3.2rem)] bg-gradient-to-r from-[#B79A5B] via-[#d4a574] to-[#B79A5B] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(183,154,91,0.35)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Révélez
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(1.8rem,4.5vw,2.8rem)] text-[#f0c9e1] italic drop-shadow-[0_2px_14px_rgba(240,201,225,0.3)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      votre
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(2.2rem,5.5vw,3.4rem)] font-serif bg-gradient-to-r from-[#B79A5B] via-[#d4a574] to-[#B79A5B] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(183,154,91,0.35)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Élégance
                    </motion.span>
                  </h1>
                </div>
              </motion.div>

              {/* BLOC DROIT — Glace texte info */}
              <motion.div
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden border border-[#B79A5B]/25 backdrop-blur-2xl"
                style={{ boxShadow: "0 0 0 1px rgba(183,154,91,0.15), inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(183,154,91,0.08)" }}>

                {/* Fond verre avec dégradé subtil */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#18090f]/80 via-[#1a0a12]/85 to-[#0a050a]/90" />

                {/* Reflet haut */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/60 to-transparent" />

                {/* Effet lumière */}
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-[#B79A5B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Logo subtle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Image
                    src="/logo-chezmiss-enhanced.png"
                    alt=""
                    width={260}
                    height={260}
                    className="w-[50%] h-auto object-contain opacity-[0.08] select-none"
                    aria-hidden
                  />
                </div>

                {/* Contenu texte */}
                <div className="relative z-10 px-6 sm:px-8 py-7 sm:py-10 flex flex-col gap-4 sm:gap-5">
                  <p className="text-[13px] sm:text-[14px] leading-[1.8] sm:leading-[1.85] text-[#f0c9e1] text-justify">
                    <span className="text-[#B79A5B] font-semibold tracking-[0.08em]">CHEZ MISS</span> sublime votre beauté avec ses gammes de produits d'exception. Chacun d'eux est conçu pour répondre aux exigences des professionnelles et des clientes.
                  </p>
                  <p className="text-[13px] sm:text-[14px] leading-[1.8] text-[#f0c9e1] italic">
                    <span className="text-[#d4a574] font-medium">Les résultats parlent d'eux-mêmes.</span>
                  </p>
                </div>

                {/* Fondu bas */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#080508] via-[#080508]/50 to-transparent" />
              </motion.div>
            </div>

            {/* RANGÉE BASSE — Photo (centrée et agrandie) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full mx-auto group"
            >
              <div className="relative w-full aspect-[16/9] sm:aspect-[20/10] lg:aspect-[24/10] overflow-hidden rounded-3xl">
                {/* Bordure dorée fine */}
                <div className="absolute inset-0 rounded-3xl border border-[#B79A5B]/30 pointer-events-none z-10" />

                {/* Effet de lumière */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#B79A5B]/20 via-transparent to-[#f0c9e1]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

                <Image
                  src="/photo.PNG"
                  alt="Révélez votre Élégance"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Voile tonal avec dégradé */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#B79A5B]/5 via-transparent to-[#080508]/20 pointer-events-none group-hover:via-[#f0c9e1]/5 transition-all duration-700" />
              </div>
            </motion.div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f0c9e1]/22 text-[9px] tracking-[0.2em]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#B79A5B]/40 animate-pulse" />
        </div>
      </section>


      {/* NOS VALEURS SECTION */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#080508]/50 via-[#0d0810] to-[#080508] border-t border-b border-[#B79A5B]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.4em] text-[#B79A5B] mb-4 font-medium">
              Fondamentaux
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#f0c9e1] tracking-[0.08em]">
              Nos <span className="font-serif text-[#B79A5B]" style={{ fontFamily: 'Georgia, serif' }}>Valeurs</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(183,154,91,0.2)" }}
                  className="relative rounded-2xl overflow-hidden border border-[#B79A5B]/20 hover:border-[#B79A5B]/60 bg-gradient-to-br from-[#0d0810] via-[#0d0810]/80 to-[#080508] p-7 transition-all duration-500 group backdrop-blur-sm"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.2)"
                  }}
                >
                  {/* Effet lumière hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B79A5B]/0 via-transparent to-[#B79A5B]/0 group-hover:from-[#B79A5B]/5 group-hover:to-[#B79A5B]/5 transition-all duration-500" />

                  <div className="absolute top-4 right-4 text-[#B79A5B]/15 text-3xl font-light">{value.number}</div>
                  <Icon className="w-12 h-12 text-[#B79A5B] mb-4 group-hover:scale-125 transition-all duration-400" />
                  <h4 className="text-[#B79A5B] font-semibold mb-3 text-sm tracking-[0.15em] uppercase">{value.title}</h4>
                  <p className="text-[#f0c9e1]/75 text-xs leading-relaxed group-hover:text-[#f0c9e1] transition-colors duration-300">{value.description}</p>

                  {/* Bordure dorée subtle au bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/40 to-transparent group-hover:via-[#B79A5B]/80 transition-all duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-gradient-to-r from-[#B79A5B]/8 via-transparent to-[#f0c9e1]/5 border-y border-[#B79A5B]/25" ref={newsletterRef}>
        {isNewsletterLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto px-4 sm:px-6 text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-light text-[#f0c9e1] mb-4 tracking-[0.05em]">
              Restez <span className="font-serif text-[#B79A5B]" style={{ fontFamily: 'Georgia, serif' }}>Connecté</span>
            </h2>
            <p className="text-sm sm:text-base text-[#f0c9e1]/70 mb-10 leading-relaxed">
              Inscrivez-vous à notre infolettre pour recevoir les dernières tendances beauté et offres exclusives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-5 py-4 bg-gradient-to-r from-[#1a1320] to-[#1a1320]/95 border border-[#B79A5B]/40 rounded-xl text-[#f0c9e1] text-sm focus:border-[#B79A5B]/80 focus:shadow-[0_0_20px_rgba(183,154,91,0.2)] outline-none transition-all duration-300 font-light"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <LiquidMetalButton label="S'ABONNER" />
              </motion.div>
            </div>

            <p className="text-xs text-[#f0c9e1]/50">
              Nous respectons votre vie privée. Désabonnez-vous à tout moment.
            </p>
          </motion.div>
        )}
      </section>

      {/* Section Contact */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#080508] via-[#0d0810] to-[#080508] border-t border-[#B79A5B]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.4em] text-[#B79A5B] mb-4 font-medium">
              Nous rejoindre
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#f0c9e1] tracking-[0.08em]">
              Nous <span className="font-serif text-[#B79A5B]" style={{ fontFamily: 'Georgia, serif' }}>Contacter</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📧", title: "Email", value: "chezmiss@gmail.com" },
              { icon: "📱", title: "Téléphone", value: "+1 (514) 928-6477" },
              { icon: "📍", title: "Adresse", value: "Laval, Québec, Canada" }
            ].map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative text-center p-8 rounded-2xl border border-[#B79A5B]/20 hover:border-[#B79A5B]/50 bg-gradient-to-br from-[#0d0810] via-[#0d0810]/80 to-[#080508] group overflow-hidden transition-all duration-500 backdrop-blur-sm"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.2)"
                }}
              >
                {/* Effet lumière */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#B79A5B]/0 to-transparent group-hover:from-[#B79A5B]/8 transition-all duration-500" />

                <motion.div
                  className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300"
                  whileHover={{ rotate: 10 }}
                >
                  {contact.icon}
                </motion.div>
                <h3 className="text-[#B79A5B] font-semibold mb-3 text-sm tracking-[0.15em] uppercase">{contact.title}</h3>
                <p className="text-[#f0c9e1]/75 text-sm group-hover:text-[#f0c9e1] transition-colors duration-300 font-light">{contact.value}</p>

                {/* Bordure dorée */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/40 to-transparent group-hover:via-[#B79A5B]/80 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="border-t border-[#B79A5B]/15 py-16 sm:py-20 bg-gradient-to-b from-[#080508] via-[#0a050a] to-[#050304]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-light text-[#f0c9e1] mb-2 tracking-[0.06em]">
              Nous <span className="font-serif text-[#B79A5B]" style={{ fontFamily: 'Georgia, serif' }}>Suivre</span>
            </h2>
            <p className="text-[#f0c9e1]/60 text-sm">Retrouvez CHEZ MISS sur les réseaux sociaux</p>
          </motion.div>

          {/* Social Links */}
          <SocialLinksElite />
        </div>
      </section>

      <footer className="border-t border-[#B79A5B]/20 py-10 sm:py-12 bg-gradient-to-b from-[#050304] via-[#080508] to-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 pb-8 border-b border-[#B79A5B]/15">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center sm:text-left text-[11px] sm:text-[12px] text-[#f0c9e1]/40 tracking-[0.12em] font-light"
            >
              <span>&copy; 2026 CHEZ MISS. Tous droits réservés.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center sm:text-right text-[11px] sm:text-[12px] text-[#f0c9e1]/40 tracking-[0.15em] font-light"
            >
              <span>QUÉBEC · CANADA</span>
            </motion.div>
          </div>
        </div>
      </footer>

    </main>
  );
}
