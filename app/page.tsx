"use client";

import { useState } from "react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DesktopShortcutInit } from "@/components/DesktopShortcutInit";
import { LiquidMetalSocialIcon } from "@/components/LiquidMetalSocialIcon";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import Link from "next/link";
import { Alex_Brush } from "next/font/google";
import { Diamond, Wand2, Rocket, Fingerprint, ScanSearch, CircleUser, ShoppingCart, Sparkle, Menu, X } from "lucide-react";

const titleScript = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isClient } = useLanguage();
  
  const navItems = [
    { label: "ACCUEIL", href: "#accueil" },
    { label: "À PROPOS", href: "/a-propos" },
    { label: "BOUTIQUE", href: "/boutique" },
    { label: "CONTACT", href: "#contact" },
  ];

  const values = [
    { icon: Diamond, title: "QUALITE SUPERIEURE", description: "Des produits selectionnes avec exigence pour des resultats professionnels.", number: "01" },
    { icon: Wand2, title: "EXPERTISE & PASSION", description: "Une marque pensee par des experts pour sublimer chaque regard.", number: "02" },
    { icon: Rocket, title: "LIVRAISON RAPIDE", description: "Expedition rapide et securisee partout en France et en Europe.", number: "03" },
    { icon: Fingerprint, title: "SATISFAIT OU REMBOURSE", description: "14 jours pour changer d'avis, parce que votre satisfaction est notre priorite.", number: "04" },
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
      <div className="relative z-30 border-b border-[#B79A5B]/20 bg-gradient-to-r from-[#1a0a12] via-[#f0c9e1]/10 to-[#1a0a12] text-center text-[11px] sm:text-[13px] tracking-[0.18em] sm:tracking-[0.28em] py-2 sm:py-2.5 text-[#f0c9e1] font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center overflow-hidden">
          <span className="inline-flex items-center gap-2 sm:gap-3">
            <span className="hidden xs:block w-8 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#B79A5B]/60" />
            <span className="whitespace-nowrap">ACT LIKE A LADY</span>
            <span className="relative w-5 h-5 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#B79A5B]/55 shadow-[0_0_12px_rgba(183,154,91,0.22)] flex-shrink-0">
              <Image
                src="/eyes.png.jpeg"
                alt="Eyes accent"
                fill
                sizes="28px"
                className="object-cover object-center"
                priority
              />
              <span className="absolute inset-0 bg-gradient-to-b from-[#f0c9e1]/20 via-transparent to-[#080508]/40" />
            </span>
            <span className="whitespace-nowrap">LASH LIKE A BOSS</span>
            <span className="hidden xs:block w-8 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#B79A5B]/60" />
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#B79A5B]/[0.10] bg-black/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 lg:h-18 flex items-center justify-between gap-2 sm:gap-6 relative overflow-visible">
          <div className="flex items-center gap-3 shrink-0 relative -top-0.5 sm:-top-1 pl-0.5">
            <Image
              src="/logo-chezmiss.png"
              alt="CHEZ MISS"
              width={1528}
              height={354}
              priority
              className="cm-logo-gold h-9 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_0_24px_rgba(183,154,91,0.62)]"
            />
          </div>
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                <LiquidMetalButton label={item.label} />
              </a>
            ))}
          </nav>
          
          {/* Mobile menu button — 44px touch target */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 grid place-items-center rounded-full border border-[#B79A5B]/[0.14] bg-[#B79A5B]/[0.05] text-[#f0c9e1]/50 active:text-[#B79A5B] active:bg-[#B79A5B]/[0.14] hover:text-[#B79A5B] hover:bg-[#B79A5B]/[0.10] transition-colors mr-auto ml-1 touch-manipulation"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" className="w-11 h-11 grid place-items-center rounded-full border border-[#B79A5B]/[0.14] bg-[#B79A5B]/[0.05] text-[#f0c9e1]/50 hover:text-[#B79A5B] hover:bg-[#B79A5B]/[0.10] active:bg-[#B79A5B]/[0.14] transition-colors touch-manipulation" aria-label="Recherche"><ScanSearch size={16} /></button>
            <button type="button" className="relative w-11 h-11 grid place-items-center rounded-full border border-[#B79A5B]/[0.14] bg-[#B79A5B]/[0.05] text-[#f0c9e1]/50 hover:text-[#B79A5B] hover:bg-[#B79A5B]/[0.10] active:bg-[#B79A5B]/[0.14] transition-colors touch-manipulation" aria-label="Panier">
              <ShoppingCart size={16} />
              <span className="absolute -top-0.5 -right-0.5 text-[9px] rounded-full bg-[#B79A5B] text-black w-4 h-4 grid place-items-center font-bold">0</span>
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/signin">
                <LiquidMetalButton label="Se connecter" />
              </Link>
              <Link href="/signup">
                <LiquidMetalButton label="Créer un compte" />
              </Link>
            </div>
            <div className="hidden sm:block">
              {isClient && <LanguageSwitcher />}
            </div>
          </div>
        </div>
        
        {/* Mobile menu — full overlay avec grands touch targets */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-2xl border-b border-[#B79A5B]/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <nav className="flex flex-col items-center gap-2 py-8 px-6">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex justify-center py-1 touch-manipulation"
                >
                  <LiquidMetalButton label={item.label} />
                </a>
              ))}
              <div className="mt-4 w-16 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/30 to-transparent" />
              <div className="flex flex-col items-center gap-2 mt-4 w-full">
                <Link href="/signin" className="w-full flex justify-center" onClick={() => setMobileMenuOpen(false)}>
                  <LiquidMetalButton label="Se connecter" />
                </Link>
                <Link href="/signup" className="w-full flex justify-center" onClick={() => setMobileMenuOpen(false)}>
                  <LiquidMetalButton label="Créer un compte" />
                </Link>
              </div>
              <p className="text-[10px] tracking-[0.25em] text-[#f0c9e1]/25 mt-4">CHEZ MISS</p>
            </nav>
          </div>
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-14 sm:pt-16 pb-8 flex flex-col gap-5 sm:gap-6">
          {/* RANGÉE 3 BLOCS — sur mobile: titre en premier */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-5 sm:gap-6 lg:gap-8 items-center">

            {/* BLOC 1 — Glace texte */}
            <div className="relative rounded-2xl overflow-hidden border border-[#B79A5B]/8 lg:max-w-[500px] lg:justify-self-start order-2 lg:order-1"
              style={{ boxShadow: "0 0 0 1px rgba(183,154,91,0.06), 0 0 50px 24px #080508, 0 0 86px 42px #040204" }}>
              {/* fond verre */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#18090f]/75 to-[#0a050a]/85 backdrop-blur-xl" />
              {/* fond icône à peine visible */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/logo-chezmiss-enhanced.png"
                  alt=""
                  width={260}
                  height={260}
                  className="w-[60%] h-auto object-contain opacity-[0.12] select-none"
                  aria-hidden
                />
              </div>
              {/* reflet haut */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B79A5B]/45 to-transparent" />
              {/* texte justifié */}
              <div className="relative z-10 px-5 sm:px-7 py-6 sm:py-9 flex flex-col gap-3 sm:gap-4">
                <p className="text-[13px] sm:text-[13.5px] leading-[1.7] sm:leading-[1.75] text-[#f0c9e1] text-justify">
                  <span className="text-[#B79A5B] font-semibold tracking-[0.08em]">CHEZ MISS</span> sublime votre beauté avec ses gammes de produits d'exception. Chacun d'eux est conçu pour répondre autant aux exigences des professionnelles en salon, qu'aux clientes à domicile.
                </p>
                <p className="text-[13px] sm:text-[13.5px] leading-[1.7] sm:leading-[1.75] text-[#f0c9e1] italic text-justify">
                  <span className="text-[#B79A5B]/92">Vous le constaterez.</span> Les résultats parlent d'eux-mêmes.
                </p>
              </div>
              {/* fondu bas */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#080508] to-transparent" />
            </div>

            {/* BLOC 2 — Titre script */}
            <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6 order-1 lg:order-2">
              <h1 className={`${titleScript.className} font-normal leading-[0.84] tracking-[0.01em] text-center`}>
                <span className="block text-[clamp(3.2rem,8vw,5.4rem)] text-[#B79A5B]/95 drop-shadow-[0_2px_20px_rgba(183,154,91,0.45)]">Révélez</span>
                <span className="block text-[clamp(2.8rem,7vw,4.6rem)] text-[#f0c9e1] italic drop-shadow-[0_2px_14px_rgba(240,201,225,0.30)]">votre</span>
                <span className="block text-[clamp(3.2rem,8vw,5.4rem)] text-[#B79A5B]/95 drop-shadow-[0_2px_20px_rgba(183,154,91,0.45)]">Élégance</span>
              </h1>
            </div>

            {/* BLOC 3 — Photo fondue dans le fond */}
            <div className="relative w-full sm:w-3/4 mx-auto lg:w-[260px] xl:w-[300px] flex-shrink-0 lg:justify-self-end order-3">
              <div
                className="relative"
                style={{
                  paddingBottom: "125%",
                  WebkitMaskImage: [
                    "linear-gradient(to right,  transparent 0%, black 14%, black 82%, transparent 100%)",
                    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                  ].join(", "),
                  maskImage: [
                    "linear-gradient(to right,  transparent 0%, black 14%, black 82%, transparent 100%)",
                    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
                  ].join(", "),
                  WebkitMaskComposite: "destination-in",
                  maskComposite: "intersect",
                }}
              >
                <Image
                  src="/Révélez.png"
                  alt="Révélez votre Élégance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className="object-contain opacity-[0.68]"
                  style={{ objectPosition: "28% center" }}
                  priority
                />
                {/* voile tonal pour harmoniser avec le fond */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0d14]/20 via-transparent to-[#080508]/35 pointer-events-none" />
                {/* Titre hommage */}
                <div className="absolute inset-x-0 bottom-[12%] flex justify-center pointer-events-none">
                  <p className="text-center text-[11px] sm:text-[12px] tracking-[0.18em] text-[#B79A5B] italic drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] drop-shadow-[0_0_12px_rgba(183,154,91,0.4)]">
                    in the loving memory of Xenia
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f0c9e1]/22 text-[9px] tracking-[0.2em]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#B79A5B]/40 animate-pulse" />
        </div>
      </section>

{/* Section À PROPOS */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#080508] via-[#0a050a] to-[#080508]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16">
            {/* Texte */}
            <div className="space-y-6 order-2 lg:order-1">
              <div>
                <span className="text-[10px] tracking-[0.3em] text-[#B79A5B]/70 uppercase">Notre histoire</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#f0c9e1] mt-3 leading-tight">
                  À <span className="text-[#B79A5B]">PROPOS</span> de <span className="text-[#B79A5B]">CHEZ MISS</span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#f0c9e1]/80 leading-relaxed">
                CHEZ MISS est une marque de beauté premium née de la passion pour l'excellence et l'innovation. Chaque produit est conçu avec précision pour sublimer votre beauté naturelle.
              </p>
              <p className="text-sm sm:text-base text-[#f0c9e1]/70 leading-relaxed">
                Fondée au cœur de Québec, notre mission est de fournir des produits exceptionnels aux professionnelles en salon et aux clientes à domicile. Nous croyons que la beauté est un art.
              </p>
              <a href="/a-propos" className="inline-block">
                <LiquidMetalButton label="EN SAVOIR PLUS" viewMode="text" onClick={() => {}} />
              </a>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#B79A5B]/20 order-1 lg:order-2" style={{ aspectRatio: "4/3" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#B79A5B]/10 to-[#8B5CF6]/10" />
              <Image
                src="/Révélez.png"
                alt="À Propos"
                fill
                className="object-cover opacity-70 hover:opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080508] via-transparent to-transparent" />
            </div>
          </div>

          {/* Valeurs */}
          <div className="mt-20 pt-16 border-t border-[#B79A5B]/20">
            <h3 className="text-2xl sm:text-3xl font-light text-center text-[#f0c9e1] mb-12">
              Nos <span className="text-[#B79A5B]">Valeurs</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Diamond, title: "QUALITÉ", desc: "Produits sélectionnés avec exigence" },
                { icon: Wand2, title: "EXPERTISE", desc: "Une marque pensée par des experts" },
                { icon: Rocket, title: "RAPIDITÉ", desc: "Livraison rapide et sécurisée" },
                { icon: Fingerprint, title: "CONFIANCE", desc: "14 jours satisfait ou remboursé" }
              ].map((value, i) => {
                const Icon = value.icon;
                return (
                  <div key={i} className="rounded-xl border border-[#B79A5B]/20 hover:border-[#B79A5B]/50 bg-[#0d0810]/50 p-6 transition-all duration-300 group">
                    <Icon className="w-8 h-8 text-[#B79A5B] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-[#B79A5B] font-semibold mb-2 text-sm tracking-wider">{value.title}</h4>
                    <p className="text-[#f0c9e1]/70 text-xs leading-relaxed">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits en Avant */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.3em] text-[#B79A5B]/70 uppercase">collection</span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#f0c9e1] mt-3">
              Nos <span className="text-[#B79A5B]">Indispensables</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { name: "WHIPPED CREAM CLEANSER", price: "29,90 $", tag: "BESTSELLER", image: "/whipped-cream-cleanser.png" },
              { name: "LASH SETTING SPRAY", price: "25,90 $", tag: "NOUVEAU", image: "/lash-setting-spray.png" },
              { name: "LASH PRIMER", price: "23,90 $", tag: null, image: "/lash-primer.png" },
              { name: "PREMIUM BONDER", price: "23,90 $", tag: "PRO", image: "/premium-bonder.png" },
              { name: "CREAM REMOVER", price: "21,90 $", tag: null, image: null }
            ].map((product, i) => (
              <div key={i} className="group rounded-lg border border-[#B79A5B]/20 hover:border-[#B79A5B]/50 bg-[#0d0810]/30 overflow-hidden transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-[#140c12] to-black relative overflow-hidden">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  {product.tag && (
                    <span className="absolute top-2 left-2 text-[8px] bg-[#B79A5B] text-black px-2 py-1 rounded-full font-semibold">{product.tag}</span>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-[9px] text-[#f0c9e1]/80 font-semibold tracking-wider truncate">{product.name}</h4>
                  <p className="text-[11px] text-[#B79A5B] mt-2 font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/boutique">
              <LiquidMetalButton label="VOIR TOUTE LA COLLECTION" viewMode="text" onClick={() => {}} />
            </a>
          </div>
        </div>
      </section>

      {/* Section Infolettre */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-r from-[#8B5CF6]/10 via-transparent to-[#B79A5B]/10 border-y border-[#B79A5B]/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-[#f0c9e1] mb-4">
            Restez <span className="text-[#B79A5B]">Connectée</span>
          </h2>
          <p className="text-sm sm:text-base text-[#f0c9e1]/70 mb-8">
            Inscrivez-vous à notre infolettre pour recevoir les dernières tendances beauté et offres exclusives.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 bg-[#1a1320] border border-[#B79A5B]/30 rounded-lg text-[#f0c9e1] text-sm focus:border-[#B79A5B] outline-none transition-colors"
            />
            <button className="px-6 py-3 bg-[#B79A5B] text-black font-semibold rounded-lg hover:bg-[#B79A5B]/90 transition-colors whitespace-nowrap">
              S'ABONNER
            </button>
          </div>

          <p className="text-xs text-[#f0c9e1]/50 mt-4">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </section>

      {/* Section Contact */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-center text-[#f0c9e1] mb-12">
            Nous <span className="text-[#B79A5B]">Contacter</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📧", title: "Email", value: "info@chezmiss.ca" },
              { icon: "📱", title: "Téléphone", value: "+1 (418) 555-MISS" },
              { icon: "📍", title: "Adresse", value: "Québec, Canada" }
            ].map((contact, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-[#B79A5B] font-semibold mb-2">{contact.title}</h3>
                <p className="text-[#f0c9e1]/70 text-sm">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="border-t border-[#B79A5B]/[0.08] py-12 sm:py-16 bg-gradient-to-b from-[#080508] to-[#0d0810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#f0c9e1] mb-2">
              Nous <span className="text-[#B79A5B]">Suivre</span>
            </h2>
            <p className="text-[#f0c9e1]/60 text-sm">Retrouvez CHEZ MISS sur les réseaux sociaux</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <LiquidMetalSocialIcon
              icon="instagram"
              href="https://instagram.com/chezmiss"
              label="Instagram"
            />
            <LiquidMetalSocialIcon
              icon="facebook"
              href="https://facebook.com/chezmiss"
              label="Facebook"
            />
            <LiquidMetalSocialIcon
              icon="tiktok"
              href="https://tiktok.com/chezmiss"
              label="TikTok"
            />
            <LiquidMetalSocialIcon
              icon="linkedin"
              href="https://linkedin.com/company/chezmiss"
              label="LinkedIn"
            />
            <LiquidMetalSocialIcon
              icon="youtube"
              href="https://youtube.com/chezmiss"
              label="YouTube"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#B79A5B]/[0.08] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6 pb-6 border-b border-[#B79A5B]/[0.08]">
            {/* Staff Link */}
            <Link
              href="/staff"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B79A5B]/10 border border-[#B79A5B]/30 rounded-lg text-[#B79A5B] hover:bg-[#B79A5B]/20 transition-all text-sm font-medium"
            >
              <span>⚙️</span> Staff Access
            </Link>

            <div className="text-center text-[11px] sm:text-[13px] text-[#f0c9e1]/30 tracking-[0.08em]">
              <span>&copy; 2026 CHEZ MISS. Tous droits réservés.</span>
            </div>

            <div className="text-right text-[11px] sm:text-[13px] text-[#f0c9e1]/30 tracking-[0.12em]">
              <span>QUÉBEC · CANADA</span>
            </div>
          </div>
        </div>
      </footer>

      {isClient && <DesktopShortcutInit />}
      {isClient && <LanguageSwitcher />}
    </main>
  );
}
