import Hero from "@/app/components/sections/Hero"
import Texte from "@/app/components/sections/Texte"
import ImageBlock from "@/app/components/sections/ImageBlock"
import CTA from "@/app/components/sections/CTA"
import Gallery from "@/app/components/sections/Gallery"
import ProductGrid from "@/app/components/sections/ProductGrid"
import VideoBlock from "@/app/components/sections/VideoBlock"

export default function PublicRenderer({ sections }: any) {
  if (!sections || sections.length === 0) return <div className="text-center p-10 text-gray-400">No sections yet</div>

  return (
    <div className="space-y-6">
      {sections.map((s: any) => (
        <div key={s.id}>
          {s.type === "hero" && <Hero data={s.data} />}
          {s.type === "texte" && <Texte data={s.data} />}
          {s.type === "image" && <ImageBlock data={s.data} />}
          {s.type === "cta" && <CTA data={s.data} />}
          {s.type === "gallery" && <Gallery data={s.data} />}
          {s.type === "product-grid" && <ProductGrid data={s.data} />}
          {s.type === "video" && <VideoBlock data={s.data} />}
        </div>
      ))}
    </div>
  )
}
