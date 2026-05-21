"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/ui-lib/components/holographic-card";
import Image from "next/image";
import { Zap, Diamond, Wand2, Rocket, Fingerprint } from "lucide-react";

export default function AProposHolographic() {
  const values = [
    {
      icon: Diamond,
      title: "QUALITE SUPERIEURE",
      description: "Des produits sélectionnés avec exigence",
    },
    {
      icon: Wand2,
      title: "EXPERTISE & PASSION",
      description: "Une marque pensée par des experts",
    },
    {
      icon: Rocket,
      title: "LIVRAISON RAPIDE",
      description: "Expédition rapide et sécurisée",
    },
    {
      icon: Fingerprint,
      title: "100% SATISFACTION",
      description: "14 jours pour changer d'avis",
    },
  ];

  return (
    <main className="min-h-screen text-[#f0c9e1] bg-black relative overflow-hidden">
      {/* Background holographic grid */}
      <motion.div
        className="fixed inset-0 opacity-5 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(183, 154, 91, 0.05) 25%, rgba(183, 154, 91, 0.05) 26%, transparent 27%, transparent 74%, rgba(183, 154, 91, 0.05) 75%, rgba(183, 154, 91, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(183, 154, 91, 0.05) 25%, rgba(183, 154, 91, 0.05) 26%, transparent 27%, transparent 74%, rgba(183, 154, 91, 0.05) 75%, rgba(183, 154, 91, 0.05) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <HolographicCard className="mb-16">
          <motion.div
            className="rounded-2xl overflow-hidden border border-[#B79A5B]/20 bg-gradient-to-br from-[#0d0810] to-black p-12"
            whileHover={{
              borderColor: "rgba(183, 154, 91, 0.4)",
            }}
          >
            <div className="flex items-center gap-6 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-12 h-12 text-[#B79A5B]" />
              </motion.div>
              <h1 className="text-5xl font-bold text-[#B79A5B]">
                À PROPOS DE CHEZ MISS
              </h1>
            </div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg leading-relaxed">
                CHEZ MISS est une marque de beauté premium née de la passion
                pour l'excellence et l'innovation. Chaque produit est conçu avec
                précision pour sublimer votre beauté naturelle.
              </p>
              <p className="text-lg leading-relaxed">
                Fondée au cœur de Québec, notre mission est de fournir des
                produits exceptionnels aux professionnelles en salon et aux
                clientes à domicile. Nous croyons que la beauté est un art.
              </p>
            </motion.div>
          </motion.div>
        </HolographicCard>

        {/* Values grid */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#B79A5B] mb-12 text-center">
            Nos Valeurs Holographiques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <HolographicCard
                  key={value.title}
                  className="h-full"
                  intensity={0.6}
                >
                  <motion.div
                    className="rounded-2xl overflow-hidden border border-[#B79A5B]/20 bg-gradient-to-br from-[#0d0810] to-black p-6 h-full flex flex-col items-center text-center relative group"
                    whileHover={{
                      borderColor: "rgba(183, 154, 91, 0.5)",
                    }}
                  >
                    {/* Corner brackets */}
                    <div className="absolute inset-0 pointer-events-none rounded-2xl">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#B79A5B]/40 group-hover:border-[#B79A5B]/80 transition-colors" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#B79A5B]/40 group-hover:border-[#B79A5B]/80 transition-colors" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#B79A5B]/40 group-hover:border-[#B79A5B]/80 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#B79A5B]/40 group-hover:border-[#B79A5B]/80 transition-colors" />
                    </div>

                    {/* Holographic glow on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl pointer-events-none transition-opacity duration-300"
                      animate={{
                        boxShadow: [
                          "inset 0 0 20px rgba(183, 154, 91, 0)",
                          "inset 0 0 30px rgba(183, 154, 91, 0.2)",
                          "inset 0 0 20px rgba(183, 154, 91, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Content */}
                    <motion.div
                      className="relative z-10"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="w-10 h-10 text-[#B79A5B] mx-auto mb-4" />
                      <h3 className="text-sm font-bold text-[#B79A5B] tracking-widest mb-3">
                        {value.title}
                      </h3>
                      <p className="text-xs text-[#f0c9e1]/70 leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </HolographicCard>
              );
            })}
          </div>
        </motion.div>

        {/* Closing section */}
        <HolographicCard>
          <motion.div
            className="rounded-2xl overflow-hidden border border-[#B79A5B]/20 bg-gradient-to-br from-[#0d0810] to-black p-12 text-center"
            whileHover={{
              borderColor: "rgba(183, 154, 91, 0.4)",
            }}
          >
            <h2 className="text-3xl font-bold text-[#B79A5B] mb-4">
              Rejoignez Notre Univers Holographique
            </h2>
            <p className="text-lg text-[#f0c9e1]/80">
              Découvrez l'excellence dans chaque produit CHEZ MISS
            </p>
          </motion.div>
        </HolographicCard>
      </div>
    </main>
  );
}
