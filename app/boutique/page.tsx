"use client";

import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import { Sparkle } from "lucide-react";

const products = [
  { name: "WHIPPED CREAM CLEANSER", subtitle: "Nettoyant creme fouettee", price: "29,90 $ CA", tag: "BESTSELLER", image: "/whipped-cream-cleanser.png", mockup: "tube" },
  { name: "LASH SETTING SPRAY", subtitle: "Spray fixateur", price: "25,90 $ CA", tag: "NOUVEAU", image: "/lash-setting-spray.png", mockup: "spray" },
  { name: "LASH PRIMER", subtitle: "Appret pour cils", price: "23,90 $ CA", tag: null, image: "/lash-primer.png", mockup: "dropper" },
  { name: "PREMIUM BONDER", subtitle: "Accelerateur de sechage", price: "23,90 $ CA", tag: "PRO", image: "/premium-bonder.png", mockup: "dropper" },
  { name: "CREAM REMOVER", subtitle: "Dissolvant en creme", price: "21,90 $ CA", tag: null, image: null, mockup: "jar" },
];

export default function Boutique() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24 text-[#f8edf3]">
      <div className="flex items-end justify-between mb-14">
        <div>
          <div className="text-[10px] tracking-[0.3em] text-[#c59701]/70 mb-3">COLLECTION</div>
          <h2 className="text-4xl md:text-5xl font-light text-[#c59701]/90 leading-tight">
            Nos<br />
            <span className="text-[#f0c9e1]">Indispensables</span>
          </h2>
        </div>
        <LiquidMetalButton label="TOUT VOIR" viewMode="text" onClick={() => {}} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map((product, i) => (
          <article key={product.name} className="group rounded-2xl overflow-hidden border border-[#c59701]/[0.10] hover:border-[#c59701]/30 transition-all duration-500 bg-gradient-to-b from-[#0d0810] to-black">
            <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-b from-[#140c12] to-black">
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
                    <div className="absolute inset-x-0 top-0 mx-auto w-[74px] h-[24px] rounded-[8px] bg-[#171317] border border-[#c59701]/40" />
                    <div className="absolute inset-x-0 bottom-0 mx-auto w-[92px] h-[92px] rounded-[44px] bg-gradient-to-b from-[#1f1a20] to-[#0c090c] border border-[#c59701]/45 shadow-[0_8px_18px_rgba(0,0,0,0.5)]" />
                    <div className="absolute inset-x-0 bottom-[40px] mx-auto w-[68px] h-[1px] bg-[#f0c9e1]/35" />
                  </div>
                </div>
              )}
              {product.tag && (
                <span className="absolute top-3 left-3 text-[9px] tracking-[0.15em] bg-[#c59701] text-black px-2 py-0.5 rounded-full font-semibold z-10">{product.tag}</span>
              )}
              <div className="absolute bottom-3 left-3 flex gap-0.5 z-10">
                {[...Array(5)].map((_, k) => <Sparkle key={k} size={8} className="text-[#c59701] fill-[#c59701]" />)}
              </div>
            </div>
            <div className="p-4 cm-text-glass-soft">
              <h3 className="text-[10px] tracking-[0.12em] mb-1 text-[#f0c9e1]/80 font-medium">{product.name}</h3>
              <p className="text-[11px] text-[#f0c9e1]/35 mb-3">{product.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#c59701]">{product.price}</span>
                <LiquidMetalButton label="AJOUTER" viewMode="text" onClick={() => {}} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
