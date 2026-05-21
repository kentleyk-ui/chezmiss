"use client";

import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import Link from "next/link";
import { ChezmissAide } from "@/components/ChezmissAide";
import { Sparkle, ArrowLeft } from "lucide-react";

const products = [
  { name: "WHIPPED CREAM CLEANSER", subtitle: "Nettoyant creme fouettee", price: "29,90 $ CA", tag: "BESTSELLER", image: "/whipped-cream-cleanser.png", mockup: "tube" },
  { name: "LASH SETTING SPRAY", subtitle: "Spray fixateur", price: "25,90 $ CA", tag: "NOUVEAU", image: "/lash-setting-spray.png", mockup: "spray" },
  { name: "LASH PRIMER", subtitle: "Appret pour cils", price: "23,90 $ CA", tag: null, image: "/lash-primer.png", mockup: "dropper" },
  { name: "PREMIUM BONDER", subtitle: "Accelerateur de sechage", price: "23,90 $ CA", tag: "PRO", image: "/premium-bonder.png", mockup: "dropper" },
  { name: "CREAM REMOVER", subtitle: "Dissolvant en creme", price: "21,90 $ CA", tag: null, image: null, mockup: "jar" },
];

export default function Boutique() {
  return (
    <main className="cm-marble cm-page-enter min-h-screen text-[#f8edf3] overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#B79A5B]/[0.10] bg-black/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 text-[#B79A5B] hover:text-[#B79A5B]/80 transition">
            <ArrowLeft size={20} />
            <span className="text-sm font-semibold">Retour</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-[#B79A5B]">BOUTIQUE</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Section Title */}
        <div className="mb-16">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.3em] text-[#B79A5B]/70 uppercase mb-3 block">collection complète</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#f0c9e1] mb-6">
              Nos <span className="text-[#B79A5B]">Indispensables</span>
            </h2>
            <p className="text-sm sm:text-base text-[#f0c9e1]/70 max-w-2xl mx-auto">
              Découvrez notre gamme complète de produits de beauté conçus pour les professionnelles et les clientes à domicile.
            </p>
          </div>
        </div>

        {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {products.map((product, i) => (
          <article key={product.name} className="group rounded-2xl overflow-hidden border border-[#B79A5B]/[0.10] hover:border-[#B79A5B]/30 active:border-[#B79A5B]/30 transition-all duration-500 bg-gradient-to-b from-[#0d0810] to-black touch-manipulation flex flex-col h-full">
            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-b from-[#140c12] to-black flex-shrink-0">
              <div className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 75%, rgba(240,201,225,${0.18 + i*0.04}), transparent 55%), linear-gradient(180deg, rgba(60,30,50,0.3), #000)` }} />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/70 to-transparent" />
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={340}
                  height={420}
                  className="absolute inset-x-0 bottom-2 mx-auto h-[86%] w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                />
              ) : (
                <div className="absolute inset-0 flex items-end justify-center pb-5">
                  <div className="relative w-[98px] h-[132px]">
                    <div className="absolute inset-x-0 top-0 mx-auto w-[74px] h-[24px] rounded-[8px] bg-[#171317] border border-[#B79A5B]/40" />
                    <div className="absolute inset-x-0 bottom-0 mx-auto w-[92px] h-[92px] rounded-[44px] bg-gradient-to-b from-[#1f1a20] to-[#0c090c] border border-[#B79A5B]/45 shadow-[0_8px_18px_rgba(0,0,0,0.5)]" />
                    <div className="absolute inset-x-0 bottom-[40px] mx-auto w-[68px] h-[1px] bg-[#f0c9e1]/35" />
                  </div>
                </div>
              )}
              {product.tag && (
                <span className="absolute top-2.5 left-2.5 text-[9px] tracking-[0.15em] bg-[#B79A5B] text-black px-2 py-0.5 rounded-full font-semibold z-10">{product.tag}</span>
              )}
              <div className="absolute bottom-3 left-3 flex gap-0.5 z-10">
                {[...Array(5)].map((_, k) => <Sparkle key={k} size={8} className="text-[#B79A5B] fill-[#B79A5B]" />)}
              </div>
            </div>
            <div className="p-3 sm:p-4 cm-text-glass-soft flex flex-col flex-1">
              <h3 className="text-[9px] sm:text-[10px] tracking-[0.12em] mb-1 text-[#f0c9e1]/80 font-medium leading-tight">{product.name}</h3>
              <p className="text-[10px] sm:text-[11px] text-[#f0c9e1]/35 mb-3 flex-1">{product.subtitle}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-auto">
                <span className="text-[11px] sm:text-[13px] font-semibold text-[#B79A5B]">{product.price}</span>
                <LiquidMetalButton label="AJOUTER" viewMode="text" onClick={() => {}} />
              </div>
            </div>
          </article>
        ))}
      </div>

        {/* CTA Section */}
        <div className="mt-20 pt-16 border-t border-[#B79A5B]/20 text-center">
          <h3 className="text-2xl sm:text-3xl font-light text-[#f0c9e1] mb-6">
            Vous avez des <span className="text-[#B79A5B]">Questions?</span>
          </h3>
          <p className="text-sm sm:text-base text-[#f0c9e1]/70 mb-8 max-w-2xl mx-auto">
            Notre équipe est disponible pour vous aider avec vos questions sur nos produits et vos commandes.
          </p>
          <Link href="/#contact">
            <LiquidMetalButton label="NOUS CONTACTER" />
          </Link>
        </div>
      </div>

      <ChezmissAide />
    </main>
  );
}
