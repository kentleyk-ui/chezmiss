"use client";

import { motion } from "framer-motion";
import { HolographicProductCard } from "@/ui-lib/components/holographic-product-card";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import { Zap } from "lucide-react";

const products = [
  {
    name: "WHIPPED CREAM CLEANSER",
    subtitle: "Nettoyant crème fouettée",
    price: "29,90 $ CA",
    tag: "BESTSELLER",
    image: "/whipped-cream-cleanser.png",
    mockup: "tube",
  },
  {
    name: "LASH SETTING SPRAY",
    subtitle: "Spray fixateur",
    price: "25,90 $ CA",
    tag: "NOUVEAU",
    image: "/lash-setting-spray.png",
    mockup: "spray",
  },
  {
    name: "LASH PRIMER",
    subtitle: "Apprêt pour cils",
    price: "23,90 $ CA",
    tag: undefined,
    image: "/lash-primer.png",
    mockup: "dropper",
  },
  {
    name: "PREMIUM BONDER",
    subtitle: "Accélérateur de séchage",
    price: "23,90 $ CA",
    tag: "PRO",
    image: "/premium-bonder.png",
    mockup: "dropper",
  },
  {
    name: "CREAM REMOVER",
    subtitle: "Dissolvant en crème",
    price: "21,90 $ CA",
    tag: undefined,
    image: undefined,
    mockup: "jar",
  },
];

export default function BoutiqueHolographic() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-[#f8edf3] relative">
      {/* Background holographic grid animation */}
      <motion.div
        className="fixed inset-0 opacity-3 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(183, 154, 91, 0.03) 25%, rgba(183, 154, 91, 0.03) 26%, transparent 27%, transparent 74%, rgba(183, 154, 91, 0.03) 75%, rgba(183, 154, 91, 0.03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(183, 154, 91, 0.03) 25%, rgba(183, 154, 91, 0.03) 26%, transparent 27%, transparent 74%, rgba(183, 154, 91, 0.03) 75%, rgba(183, 154, 91, 0.03) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header section */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-[10px] tracking-[0.3em] text-[#B79A5B]/70 mb-3 flex items-center gap-2"
            animate={{
              color: ["rgba(183, 154, 91, 0.7)", "rgba(183, 154, 91, 1)"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
              <Zap size={12} className="fill-current" />
            </motion.div>
            COLLECTION HOLOGRAPHIQUE
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            <motion.span
              className="text-[#B79A5B]"
              animate={{
                textShadow: [
                  "0 0 10px rgba(183, 154, 91, 0.5)",
                  "0 0 20px rgba(183, 154, 91, 0.8)",
                  "0 0 10px rgba(183, 154, 91, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Nos
            </motion.span>
            <br />
            <span className="text-[#f0c9e1]">Indispensables 3D</span>
          </h2>
        </motion.div>

        <motion.div
          className="self-start sm:self-end"
          whileHover={{ scale: 1.05 }}
        >
          <LiquidMetalButton label="AFFICHER TOUT" viewMode="text" onClick={() => {}} />
        </motion.div>
      </div>

      {/* Products grid with holographic cards */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
        {products.map((product, idx) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.1,
            }}
          >
            <HolographicProductCard {...product} index={idx} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer section */}
      <motion.div
        className="mt-16 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-[#f0c9e1]/60 tracking-widest"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          TECHNOLOGIE HOLOGRAPHIQUE ACTIVÉE
        </motion.p>
      </motion.div>
    </main>
  );
}
