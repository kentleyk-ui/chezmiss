"use client";

import { Diamond, Wand2, Rocket, Fingerprint, ArrowLeft } from "lucide-react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import Link from "next/link";
import { ChezmissAide } from "@/components/ChezmissAide";

export default function AboutPage() {
  return (
    <main className="cm-marble cm-page-enter min-h-screen text-[#f8edf3] overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-[#B79A5B]/[0.10] bg-black/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 text-[#B79A5B] hover:text-[#B79A5B]/80 transition">
            <ArrowLeft size={20} />
            <span className="text-sm font-semibold">Retour</span>
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-[#B79A5B]">À PROPOS</h1>
          <div className="w-12" />
        </div>
      </header>

      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#080508] via-[#0a050a] to-[#080508]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16">
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
              <p className="text-sm sm:text-base text-[#f0c9e1]/70 leading-relaxed">
                Chaque formulation est le fruit de recherches approfondies et de collaborations avec les meilleurs experts du secteur. Nous nous engageons à utiliser des ingrédients de qualité supérieure, testés et approuvés.
              </p>
            </div>

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

          <div className="mt-20 pt-16 border-t border-[#B79A5B]/20">
            <h3 className="text-2xl sm:text-3xl font-light text-center text-[#f0c9e1] mb-12">
              Nos <span className="text-[#B79A5B]">Valeurs</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Diamond, title: "QUALITÉ", desc: "Produits sélectionnés avec exigence pour des résultats professionnels", number: "01" },
                { icon: Wand2, title: "EXPERTISE", desc: "Une marque pensée par des experts pour sublimer chaque regard", number: "02" },
                { icon: Rocket, title: "RAPIDITÉ", desc: "Livraison rapide et sécurisée partout en France et en Europe", number: "03" },
                { icon: Fingerprint, title: "CONFIANCE", desc: "14 jours pour changer d'avis, parce que votre satisfaction est notre priorité", number: "04" }
              ].map((value, i) => {
                const Icon = value.icon;
                return (
                  <div key={i} className="rounded-xl border border-[#B79A5B]/20 hover:border-[#B79A5B]/50 bg-[#0d0810]/50 p-6 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-[#B79A5B]/20 text-2xl font-light">{value.number}</div>
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

      <ChezmissAide />
    </main>
  );
}
