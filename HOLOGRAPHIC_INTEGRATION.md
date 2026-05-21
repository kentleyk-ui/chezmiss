// EXEMPLE D'INTÉGRATION — Holographic Components

// ============================================================================
// 1. UTILISATION BASIQUE: HolographicCard
// ============================================================================

import { HolographicCard } from "@/ui-lib/components/holographic-card";

export function SimpleExample() {
  return (
    <HolographicCard intensity={0.8}>
      <div className="rounded-2xl border border-[#B79A5B]/20 bg-black p-6">
        {/* Votre contenu ici */}
        <h2 className="text-[#B79A5B]">Contenu Holographique</h2>
      </div>
    </HolographicCard>
  );
}

// ============================================================================
// 2. UTILISATION AVANCÉE: HolographicProductCard
// ============================================================================

import { HolographicProductCard } from "@/ui-lib/components/holographic-product-card";

export function ProductGridExample() {
  const products = [
    {
      name: "PRODUIT 1",
      subtitle: "Description",
      price: "29,90 $",
      tag: "BESTSELLER",
      image: "/product-1.png",
      mockup: "tube",
    },
    // ...
  ];

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product, idx) => (
        <HolographicProductCard key={product.name} {...product} index={idx} />
      ))}
    </div>
  );
}

// ============================================================================
// 3. REMPLACER BOUTIQUE PAR VERSION HOLOGRAPHIQUE
// ============================================================================

// Fichier: app/boutique/page.tsx
// Étapes:

// AVANT (version actuelle):
import Image from "next/image";
import { Sparkle } from "lucide-react";

export default function Boutique() {
  return (
    <main>
      <div className="grid grid-cols-5 gap-4">
        {products.map((product, i) => (
          <article className="border border-[#B79A5B]/10 rounded-2xl">
            {/* Contenu standard */}
          </article>
        ))}
      </div>
    </main>
  );
}

// APRÈS (version holographique):
import { HolographicProductCard } from "@/ui-lib/components/holographic-product-card";
import { motion } from "framer-motion";

export default function Boutique() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24 text-[#f8edf3]">
      <div className="grid grid-cols-5 gap-4">
        {products.map((product, idx) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <HolographicProductCard {...product} index={idx} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}

// ============================================================================
// 4. REMPLACER À PROPOS PAR VERSION HOLOGRAPHIQUE
// ============================================================================

// AVANT (version actuelle):
export default function APropos() {
  return (
    <main className="min-h-screen text-[#f0c9e1] bg-black">
      <h1 className="text-4xl font-bold text-[#B79A5B]">À PROPOS</h1>
      <p>Contenu...</p>
    </main>
  );
}

// APRÈS (version holographique):
import { HolographicCard } from "@/ui-lib/components/holographic-card";
import { Diamond, Wand2, Rocket, Fingerprint } from "lucide-react";
import { motion } from "framer-motion";

export default function APropos() {
  const values = [
    { icon: Diamond, title: "QUALITÉ", description: "Excellence" },
    // ...
  ];

  return (
    <main className="min-h-screen text-[#f0c9e1] bg-black">
      <HolographicCard>
        <h1 className="text-5xl font-bold text-[#B79A5B]">À PROPOS</h1>
      </HolographicCard>

      <div className="grid grid-cols-4 gap-6">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <HolographicCard key={value.title} intensity={0.6}>
              <div className="rounded-2xl border border-[#B79A5B]/20 p-6 text-center">
                <Icon className="w-10 h-10 text-[#B79A5B] mx-auto mb-4" />
                <h3 className="text-[#B79A5B] font-bold">{value.title}</h3>
                <p className="text-[#f0c9e1]/70 text-sm">{value.description}</p>
              </div>
            </HolographicCard>
          );
        })}
      </div>
    </main>
  );
}

// ============================================================================
// 5. CONFIGURATION PERSONNALISÉE
// ============================================================================

// Personnaliser l'intensité du tilt:
export function CustomIntensityExample() {
  return (
    <>
      {/* Tilt subtil (menu items) */}
      <HolographicCard intensity={0.3}>
        <div>Menu Item</div>
      </HolographicCard>

      {/* Tilt normal (cartes À Propos) */}
      <HolographicCard intensity={0.6}>
        <div>Value Card</div>
      </HolographicCard>

      {/* Tilt intense (cartes produits) */}
      <HolographicCard intensity={0.8}>
        <div>Product Card</div>
      </HolographicCard>

      {/* Tilt maximum (hero sections) */}
      <HolographicCard intensity={1.0}>
        <div>Hero Card</div>
      </HolographicCard>
    </>
  );
}

// ============================================================================
// 6. AJOUTER HOLOGRAPHIC À D'AUTRES PAGES
// ============================================================================

// Exemple: Page produit détaillée
import { HolographicCard } from "@/ui-lib/components/holographic-card";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <main className="min-h-screen bg-black text-[#f0c9e1]">
      <div className="grid grid-cols-2 gap-12">
        {/* Galerie holographique */}
        <HolographicCard intensity={0.9}>
          <div className="rounded-2xl overflow-hidden">
            <Image src={product.image} alt={product.name} fill />
          </div>
        </HolographicCard>

        {/* Détails holographiques */}
        <HolographicCard intensity={0.6}>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#B79A5B] mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-[#f0c9e1]/80">{product.description}</p>
            <button className="mt-8">Ajouter au panier</button>
          </div>
        </HolographicCard>
      </div>
    </main>
  );
}

// ============================================================================
// 7. COMBINER AVEC LES COMPONENTS EXISTANTS
// ============================================================================

// HolographicCard fonctionne bien avec:
// - LiquidMetalButton
// - Framer Motion (motion.div)
// - Lucide icons
// - Next.js Image
// - Tailwind CSS

export function CombinedExample() {
  return (
    <HolographicCard intensity={0.7}>
      <div className="rounded-2xl border border-[#B79A5B]/20 bg-gradient-to-br from-[#0d0810] to-black p-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8 }}>
            <Zap className="w-8 h-8 text-[#B79A5B]" />
          </motion.div>
          <h2 className="text-3xl font-bold text-[#B79A5B]">Titre</h2>
        </div>

        <p className="text-[#f0c9e1]/80 mb-6">Description</p>

        <LiquidMetalButton label="ACTION" onClick={() => {}} />
      </div>
    </HolographicCard>
  );
}

// ============================================================================
// 8. NOTES IMPORTANTES
// ============================================================================

/*
✅ À FAIRE:
- Utiliser intensity entre 0.3 et 1.0
- Combiner avec les animations Framer Motion
- Tester les performances sur mobile
- Utiliser les couleurs gold/pink existantes

❌ À ÉVITER:
- Trop de cartes holographiques sur une même page (>20)
- Intensity > 1.0 (effet excessif)
- Animations trop rapides (<1s)
- Mélanger avec d'autres systèmes de 3D

⚡ PERFORMANCE:
- Toutes les animations utilisent GPU acceleration
- 60 FPS stable sur desktop/tablet
- Mobile: peut être réduit à 30 FPS si nécessaire
- Utiliser prefers-reduced-motion pour accessibilité
*/
