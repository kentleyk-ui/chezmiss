"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function KseniaMemorial() {
  const [activeTab, setActiveTab] = useState<"gallery" | "milele">("gallery");
  const [showMileleReveal, setShowMileleReveal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const kseniaMoments = [
    {
      image: "/Révélez.png",
      quote: "La beauté réside dans l'authenticité.",
      year: "2024",
    },
    {
      image: "/Révélez.png",
      quote: "Chaque moment compte, chérissez-le.",
      year: "2023",
    },
    {
      image: "/Révélez.png",
      quote: "L'élégance est un état d'esprit.",
      year: "2022",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Backdrop gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle,rgba(183,154,91,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(240,201,225,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Ksenia Memorial */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative"
          >
            {/* Header */}
            <div className="mb-8 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#B79A5B]/10 border border-[#B79A5B]/30 rounded-full"
              >
                <Heart size={16} className="text-[#B79A5B]" />
                <span className="text-sm text-[#B79A5B] font-semibold tracking-[0.1em]">
                  IN LOVING MEMORY
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl font-light text-[#f0c9e1]"
              >
                Ksenia
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl sm:text-2xl text-[#B79A5B] font-light tracking-widest"
              >
                1987 — 2025
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-16 h-1 bg-gradient-to-r from-[#B79A5B] to-transparent"
              />
            </div>

            {/* Emotional text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 mb-8"
            >
              <p className="text-lg sm:text-xl text-[#f0c9e1] leading-relaxed italic font-light">
                "Une vie de grâce, d'élégance et de passion. Ksenia a inspiré chacun par sa beauté intérieure et son amour pour la vie."
              </p>

              <div className="space-y-4 text-[#f0c9e1]/80 text-sm sm:text-base leading-relaxed">
                <p>
                  Elle croyait que la beauté n'était pas qu'une apparence, mais une expression de l'âme. Chaque produit, chaque geste, chaque sourire était une manifestation de son art de vivre.
                </p>
                <p>
                  Son héritage persiste dans chaque moment partagé, dans chaque rire entendu, dans chaque cœur qu'elle a touché.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-[#B79A5B]/20"
            >
              {[
                { label: "Années", value: "37" },
                { label: "Passions", value: "∞" },
                { label: "Vies touchées", value: "∞" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-light text-[#B79A5B] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#f0c9e1]/60 tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-6 py-3 rounded-lg font-semibold text-sm tracking-[0.1em] transition-all duration-300 ${
                  activeTab === "gallery"
                    ? "bg-[#B79A5B] text-black"
                    : "bg-[#B79A5B]/10 text-[#B79A5B] hover:bg-[#B79A5B]/20 border border-[#B79A5B]/30"
                }`}
              >
                GALERIE
              </button>
              <button
                onClick={() => {
                  setActiveTab("milele");
                  setShowMileleReveal(true);
                }}
                className={`px-6 py-3 rounded-lg font-semibold text-sm tracking-[0.1em] transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "milele"
                    ? "bg-[#B79A5B] text-black"
                    : "bg-[#B79A5B]/10 text-[#B79A5B] hover:bg-[#B79A5B]/20 border border-[#B79A5B]/30"
                }`}
              >
                MILELE
                <Sparkles size={16} />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative h-96 sm:h-[500px]"
          >
            <AnimatePresence mode="wait">
              {activeTab === "gallery" ? (
                // Gallery Section
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  {/* Image Carousel */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    {/* Main Image */}
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={kseniaMoments[currentImageIndex].image}
                        alt={`Ksenia ${currentImageIndex + 1}`}
                        fill
                        className="object-cover opacity-70"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      {/* Top decorative */}
                      <div className="flex gap-2">
                        {kseniaMoments.map((_, i) => (
                          <motion.div
                            key={i}
                            className="h-1 flex-1 rounded-full bg-[#B79A5B]/30"
                            animate={{
                              backgroundColor:
                                i === currentImageIndex
                                  ? "#B79A5B"
                                  : "rgba(183, 154, 91, 0.3)",
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        ))}
                      </div>

                      {/* Quote at bottom */}
                      <motion.div
                        key={`quote-${currentImageIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        <p className="text-2xl sm:text-3xl font-light text-[#f0c9e1] italic leading-snug">
                          "{kseniaMoments[currentImageIndex].quote}"
                        </p>
                        <p className="text-sm text-[#B79A5B] tracking-[0.15em] font-semibold">
                          {kseniaMoments[currentImageIndex].year}
                        </p>
                      </motion.div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                      {kseniaMoments.map((_, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentImageIndex
                              ? "w-8 bg-[#B79A5B]"
                              : "bg-[#f0c9e1]/40 hover:bg-[#f0c9e1]/60"
                          }`}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#B79A5B]/20 to-[#f0c9e1]/10 blur-2xl -z-10" />
                </motion.div>
              ) : (
                // Milele Section
                <motion.div
                  key="milele"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full rounded-3xl overflow-hidden"
                >
                  {/* Glass Container */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-[#0d0810]/40 backdrop-blur-lg border border-[#B79A5B]/30"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(13, 8, 16, 0.5) 0%, rgba(26, 10, 18, 0.3) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  />

                  <div className="relative h-full flex flex-col justify-center items-center p-8 sm:p-12 text-center space-y-8">
                    {/* Icon */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl sm:text-7xl"
                    >
                      ✨
                    </motion.div>

                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h3 className="text-4xl sm:text-5xl font-light text-[#f0c9e1]">
                        MILELE
                      </h3>
                      <p className="text-sm sm:text-base text-[#B79A5B] tracking-[0.15em] font-semibold">
                        L'ÉTERNITÉ DES SOUVENIRS
                      </p>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4 max-w-sm"
                    >
                      <p className="text-[#f0c9e1]/90 leading-relaxed text-sm sm:text-base">
                        Une plateforme dédiée à honorer les vies précieuses. Créez des mémoriels numériques vivants, partagez des photos, des histoires et des souvenirs qui célèbrent chaque moment.
                      </p>
                      <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#f0c9e1]/70">
                        <p>✦ Galeries de photos infinies</p>
                        <p>✦ Histoires et témoignages partagés</p>
                        <p>✦ Un espace pour se souvenir ensemble</p>
                      </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="pt-4"
                    >
                      <a
                        href="https://www.milele4ever.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#B79A5B] hover:bg-[#B79A5B]/90 text-black font-bold text-sm tracking-[0.1em] rounded-lg transition-all duration-300"
                      >
                        DÉCOUVRIR MILELE
                        <ChevronRight size={16} />
                      </a>
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-8 left-8 text-3xl opacity-20"
                    >
                      💎
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute bottom-8 right-8 text-3xl opacity-20"
                    >
                      🌟
                    </motion.div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#B79A5B]/20 to-[#f0c9e1]/10 blur-2xl -z-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          viewport={{ once: false }}
          className="mt-16 sm:mt-24 text-center"
        >
          <p className="text-[#f0c9e1]/70 text-sm sm:text-base mb-6">
            Son mémorial vit sur Milele. Rejoignez la communauté et célébrez les vies précieuses.
          </p>
          <a
            href="https://www.milele4ever.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#B79A5B]/20 to-[#f0c9e1]/10 border border-[#B79A5B]/30 rounded-xl text-[#B79A5B] hover:border-[#B79A5B]/60 hover:from-[#B79A5B]/30 transition-all duration-300 font-semibold tracking-[0.1em]"
          >
            <Heart size={18} />
            VISITER LE MÉMORIAL
            <ChevronRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
