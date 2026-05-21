import Hero from "@/app/components/sections/Hero"
import Texte from "@/app/components/sections/Texte"
import ImageBlock from "@/app/components/sections/ImageBlock"

export default function Renderer({ sections, onSelect }: any) {
  return (
    <div className="space-y-6">
      {sections.map((s: any) => {
        const props = { data: s.data }

        return (
          <div key={s.id} onClick={() => onSelect?.(s)}>
            {s.type === "hero" && <Hero {...props} />}
            {s.type === "texte" && <Texte {...props} />}
            {s.type === "image" && <ImageBlock {...props} />}
          </div>
        )
      })}
    </div>
  )
}
