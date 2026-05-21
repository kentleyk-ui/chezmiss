import Hero from "@/app/components/sections/Hero"
import Texte from "@/app/components/sections/Texte"
import ImageBlock from "@/app/components/sections/ImageBlock"

export default function PublicRenderer({ sections }: any) {
  if (!sections || sections.length === 0) return <div className="text-center p-10 text-gray-400">No sections yet</div>

  return (
    <div className="space-y-6">
      {sections.map((s: any) => (
        <div key={s.id}>
          {s.type === "hero" && <Hero data={s.data} />}
          {s.type === "texte" && <Texte data={s.data} />}
          {s.type === "image" && <ImageBlock data={s.data} />}
        </div>
      ))}
    </div>
  )
}
