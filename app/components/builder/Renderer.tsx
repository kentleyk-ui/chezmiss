import Hero from "@/app/components/sections/Hero"
import Texte from "@/app/components/sections/Texte"
import ImageBlock from "@/app/components/sections/ImageBlock"
import CTA from "@/app/components/sections/CTA"
import Gallery from "@/app/components/sections/Gallery"
import ProductGrid from "@/app/components/sections/ProductGrid"
import VideoBlock from "@/app/components/sections/VideoBlock"

export default function Renderer({ sections, onSelect }: any) {
  return (
    <div className="space-y-6">
      {sections.map((s: any) => {
        const props = { data: s.data }

        return (
          <div key={s.id} onClick={() => onSelect?.(s)} className="cursor-pointer hover:opacity-80 transition-opacity">
            {s.type === "hero" && <Hero {...props} />}
            {s.type === "texte" && <Texte {...props} />}
            {s.type === "image" && <ImageBlock {...props} />}
            {s.type === "cta" && <CTA {...props} />}
            {s.type === "gallery" && <Gallery {...props} />}
            {s.type === "product-grid" && <ProductGrid {...props} />}
            {s.type === "video" && <VideoBlock {...props} />}
            {!["hero", "texte", "image", "cta", "gallery", "product-grid", "video"].includes(s.type) && (
              <div className="p-4 bg-yellow-900/20 border border-yellow-700/30 rounded text-yellow-400 text-sm">
                Section type "{s.type}" non supporté
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
