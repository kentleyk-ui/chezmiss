"use client";

import { useState } from "react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import { Alex_Brush } from "next/font/google";
import { Diamond, Wand2, Rocket, Fingerprint, ScanSearch, CircleUser, ShoppingCart, Sparkle, Menu, X } from "lucide-react";

const titleScript = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: "ACCUEIL", href: "#accueil" },
    { label: "À PROPOS", href: "/a-propos" },
    { label: "BOUTIQUE", href: "#boutique" },
    { label: "CONTACTE", href: "#contact" },
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
      <div className="relative z-30 border-b border-[#c59701]/20 bg-gradient-to-r from-[#1a0a12] via-[#f0c9e1]/10 to-[#1a0a12] text-center text-[13px] sm:text-[15px] tracking-[0.24em] sm:tracking-[0.3em] py-2.5 text-[#f0c9e1] font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-center">
          <span className="inline-flex items-center gap-2.5 sm:gap-3">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#c59701]/60" />
            <span className="whitespace-nowrap">ACT LIKE A LADY</span>
            <span className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#c59701]/55 shadow-[0_0_12px_rgba(197,151,1,0.22)]">
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
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#c59701]/60" />
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#c59701]/[0.10] bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4 sm:gap-6 relative overflow-visible">
          <div className="flex items-center gap-3 shrink-0 relative -top-0.5 sm:-top-1 pl-0.5">
            <Image
              src="/logo-chezmiss.png"
              alt="CHEZ MISS"
              width={1528}
              height={354}
              priority
              className="cm-logo-gold h-9 sm:h-12 lg:h-14 w-auto object-contain drop-shadow-[0_0_24px_rgba(197,151,1,0.62)]"
            />
          </div>
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                <LiquidMetalButton label={item.label} />
              </a>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-[#c59701]/[0.14] bg-[#c59701]/[0.05] text-[#f0c9e1]/50 hover:text-[#c59701] hover:bg-[#c59701]/[0.10] transition-colors mr-auto ml-2"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button type="button" className="w-9 h-9 grid place-items-center rounded-full border border-[#c59701]/[0.14] bg-[#c59701]/[0.05] text-[#f0c9e1]/50 hover:text-[#c59701] hover:bg-[#c59701]/[0.10] transition-colors" aria-label="Recherche"><ScanSearch size={15} /></button>
            <button type="button" className="w-9 h-9 grid place-items-center rounded-full border border-[#c59701]/[0.14] bg-[#c59701]/[0.05] text-[#f0c9e1]/50 hover:text-[#c59701] hover:bg-[#c59701]/[0.10] transition-colors" aria-label="Compte"><CircleUser size={15} /></button>
            <button type="button" className="relative w-9 h-9 grid place-items-center rounded-full border border-[#c59701]/[0.14] bg-[#c59701]/[0.05] text-[#f0c9e1]/50 hover:text-[#c59701] hover:bg-[#c59701]/[0.10] transition-colors" aria-label="Panier">
              <ShoppingCart size={15} />
              <span className="absolute -top-1 -right-1 text-[9px] rounded-full bg-[#c59701] text-black w-3.5 h-3.5 grid place-items-center font-bold">0</span>
            </button>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-[#c59701]/[0.15]">
            <nav className="flex flex-col items-center gap-3 py-6 px-4">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LiquidMetalButton label={item.label} />
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="accueil" className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(240,201,225,0.12)_0%,transparent_65%)]" />
          <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(197,151,1,0.09)_0%,transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-[#c59701]/15 to-transparent rotate-12" />
        </div>
        <div className="absolute top-4 sm:top-5 left-6 sm:left-8 lg:left-10">
          <div 
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#c59701] rounded-full px-4 py-1.5 bg-[#c59701]/5"
            style={{
              border: "1px solid rgba(197,151,1,0.35)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), 0 0 12px rgba(197,151,1,0.15)",
              textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 0 8px rgba(197,151,1,0.3)",
            }}
          >
            LUXE · BEAUTÉ · CONFIANCE
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full pt-16 pb-8 flex flex-col gap-6">
          {/* RANGÉE 3 BLOCS */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-6 lg:gap-8 items-center">

            {/* BLOC 1 — Glace texte, taille calée sur son contenu */}
            <div className="relative rounded-2xl overflow-hidden border border-[#c59701]/8 lg:max-w-[500px] lg:justify-self-start"
              style={{ boxShadow: "0 0 0 1px rgba(197,151,1,0.06), 0 0 50px 24px #080508, 0 0 86px 42px #040204" }}>
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
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c59701]/45 to-transparent" />
              {/* texte justifié */}
              <div className="relative z-10 px-7 py-9 flex flex-col gap-4">
                <p className="text-[13.5px] leading-[1.75] text-[#f0c9e1] text-justify">
                  <span className="text-[#c59701] font-semibold tracking-[0.08em]">CHEZ MISS</span> sublime votre beauté avec ses gammes de produits d'exception. Chacun d'eux est conçu pour répondre autant aux exigences des professionnelles en salon, qu'aux clientes à domicile.
                </p>
                <p className="text-[13.5px] leading-[1.75] text-[#f0c9e1] italic text-justify">
                  <span className="text-[#c59701]/92">Vous le constaterez.</span> Les résultats parlent d'eux-mêmes.
                </p>
              </div>
              {/* fondu bas */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#080508] to-transparent" />
            </div>

            {/* BLOC 2 — Titre script, invisible */}
            <div className="flex items-center justify-center px-4 lg:px-6">
              <h1 className={`${titleScript.className} font-normal leading-[0.84] tracking-[0.01em] text-center`}>
                <span className="block text-[clamp(2.8rem,5.5vw,5.4rem)] text-[#c59701]/95 drop-shadow-[0_2px_20px_rgba(197,151,1,0.45)]">Révélez</span>
                <span className="block text-[clamp(2.4rem,4.8vw,4.6rem)] text-[#f0c9e1] italic drop-shadow-[0_2px_14px_rgba(240,201,225,0.30)]">votre</span>
                <span className="block text-[clamp(2.8rem,5.5vw,5.4rem)] text-[#c59701]/95 drop-shadow-[0_2px_20px_rgba(197,151,1,0.45)]">Élégance</span>
              </h1>
            </div>

            {/* BLOC 3 — Photo fondue dans le fond */}
            <div className="relative rounded-2xl overflow-hidden w-full lg:w-[260px] xl:w-[300px] flex-shrink-0 lg:justify-self-end"
              style={{ boxShadow: "0 0 55px 28px #080508, 0 0 90px 45px #040204" }}>
              <div className="relative" style={{ paddingBottom: "125%" }}>
                <Image
                  src="/Révélez.png"
                  alt="Révélez votre Élégance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className="object-contain object-center opacity-[0.72]"
                  priority
                />
                {/* voile global pour encrer la photo dans le fond */}
                <div className="absolute inset-0 bg-[#080508]/36" />
                {/* fondu elegant theme gold/pink + ombrage */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a0d14]/46 via-transparent to-[#080508]/80" />
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#080508]/90 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#080508]/85 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#080508]/76 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080508]/92 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(8,5,8,0.58)_100%)]" />
              </div>
            </div>
          </div>


        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f0c9e1]/22 text-[9px] tracking-[0.2em]">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#c59701]/40 animate-pulse" />
        </div>
      </section>

{/* Section produits déplacée vers /boutique */}

      <footer className="border-t border-[#c59701]/[0.08] py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between">
            <span>&copy; 2026 CHEZ MISS. Tous droits réservés.</span>
            <span className="tracking-[0.12em]">QUEBEC · CANADA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
