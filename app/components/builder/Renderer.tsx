import { Section } from "@/types";
import Hero from "@/app/components/sections/Hero";
import Texte from "@/app/components/sections/Texte";
import ImageBlock from "@/app/components/sections/ImageBlock";
import CTA from "@/app/components/sections/CTA";
import Gallery from "@/app/components/sections/Gallery";
import ProductGrid from "@/app/components/sections/ProductGrid";
import VideoBlock from "@/app/components/sections/VideoBlock";

interface RendererProps {
  sections: Section[];
  onSelect?: (section: Section) => void;
}

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  texte: Texte,
  image: ImageBlock,
  cta: CTA,
  gallery: Gallery,
  "product-grid": ProductGrid,
  video: VideoBlock,
};

export default function Renderer({ sections, onSelect }: RendererProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.type];

        if (!Component) {
          return (
            <div
              key={section.id}
              className="p-4 bg-[#B79A5B]/20 border border-[#B79A5B]/30 rounded text-[#B79A5B] text-sm"
            >
              Section type "{section.type}" non supporté
            </div>
          );
        }

        return (
          <div
            key={section.id}
            onClick={() => onSelect?.(section)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Component data={section.data} />
          </div>
        );
      })}
    </div>
  );
}
