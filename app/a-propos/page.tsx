"use client";

import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import { Alex_Brush } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const titleScript = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function AProposPage() {
  const router = useRouter();

  return (
    <main className="cm-marble min-h-screen text-[#f8edf3] overflow-x-hidden">
      <section className="relative overflow-hidden">
        <div className="absolute top-5 left-6 sm:left-8 z-10 pointer-events-none">
          <div className="relative">
            <Image
              src="/logo-chezmiss.png"
              alt="CHEZ MISS"
              width={1528}
              height={354}
              className="cm-logo-gold h-12 sm:h-14 lg:h-16 w-auto object-contain opacity-100"
              priority
            />

          </div>
        </div>

        <div className="absolute top-5 right-6 sm:right-8 z-20">
          <LiquidMetalButton label="RETOUR À L'ACCUEIL" viewMode="text" onClick={() => router.push("/")} />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-28 sm:pt-32 pb-14">
          <div className="flex justify-center text-center">
            <div className="max-w-4xl">
              <h1 className={`${titleScript.className} leading-[0.9] tracking-[0.01em]`}>
                <span className="block text-[clamp(3rem,8vw,6.8rem)] text-[#c59701] drop-shadow-[0_2px_20px_rgba(197,151,1,0.42)]">À</span>
                <span className="block text-[clamp(3rem,8vw,6.8rem)] text-[#f0c9e1] drop-shadow-[0_2px_16px_rgba(240,201,225,0.30)]">Propos</span>
              </h1>
              <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#f0c9e1] max-w-2xl mx-auto">
                L'histoire, la vision et l'expertise derrière l'univers CHEZ MISS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="cm-text-glass-strong cm-glass-gold-border rounded-3xl p-7 sm:p-10 lg:p-12">
            <div className="space-y-5 text-[14px] sm:text-[15px] leading-relaxed text-[#f0c9e1] text-justify">
              <p>
                Depuis toujours, la beauté occupe une place importante dans ma vie. Très jeune, je savais déjà que je voulais évoluer dans cet univers où la créativité, la confiance en soi et le contact humain se rencontrent.
              </p>
              <p>
                J'ai commencé officiellement dans l'industrie de la beauté en 2008, en développant mon expérience à travers différents salons avant de bâtir ma propre entreprise : CHEZ MISS. Au fil des ans, j'ai perfectionné mes compétences en : coiffure, onglerie, extensions de cils ainsi qu'en beauté semi-permanente. Mon approche est toujours axée sur la qualité, le détail et le professionnalisme. Vous trouverez tous mes produits pour chaque spécialité sous l'onglet BOUTIQUE.
              </p>
              <p>
                Ce métier représente beaucoup plus qu'un simple service pour moi. Ce que j'aime profondément, c'est l'impact que la beauté peut avoir sur la confiance d'une femme. Chaque cliente qui passe par mon salon mérite de se sentir écoutée, valorisée et mise en confiance dans un environnement chaleureux et humain.
              </p>
              <p>
                Après plus de 18 ans d'expérience dans le domaine, j'ai développé une clientèle fidèle qui me suit depuis plusieurs années. Cette confiance, bâtie au fil du temps, est l'une des plus grandes fiertés de mon parcours. Mon approche perfectionniste, mon souci du détail et ma passion pour l'évolution constante de mon travail sont ce qui définissent aujourd'hui l'univers que j'ai créé.
              </p>
              <p>
                En parallèle de mes services, je partage également mon expérience à travers la formation, avec une approche humaine et encadrée qui permet aux élèves de développer leur technique avec confiance et professionnalisme.
              </p>
              <p>
                Aujourd'hui, mon objectif est de continuer à faire évoluer cet univers en offrant une expérience beauté complète où la passion, la qualité et l'authenticité se rencontrent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
