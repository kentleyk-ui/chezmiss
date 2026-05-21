import { Section, SectionData } from "@/types";
import { SECTION_TYPES, SECTION_TYPE_LABELS } from "@/lib/constants";
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

interface SectionComponentProps {
  data: SectionData;
}

const SECTION_COMPONENTS: Record<
  string,
  React.ComponentType<SectionComponentProps>
> = {
  [SECTION_TYPES.HERO]: Hero,
  [SECTION_TYPES.TEXT]: Texte,
  [SECTION_TYPES.IMAGE]: ImageBlock,
  [SECTION_TYPES.CTA]: CTA,
  [SECTION_TYPES.GALLERY]: Gallery,
  [SECTION_TYPES.PRODUCT_GRID]: ProductGrid,
  [SECTION_TYPES.VIDEO]: VideoBlock,
};

function UnsupportedSection({ type }: { type: string }) {
  return (
    <div className="p-4 bg-[#B79A5B]/20 border border-[#B79A5B]/30 rounded text-[#B79A5B] text-sm">
      Section type "{type}" non supportée
    </div>
  );
}

export default function Renderer({ sections, onSelect }: RendererProps) {
  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const Component = SECTION_COMPONENTS[section.type];

        if (!Component) {
          return (
            <div key={section.id} onClick={() => onSelect?.(section)} className="cursor-pointer">
              <UnsupportedSection type={section.type} />
            </div>
          );
        }

        return (
          <div
            key={section.id}
            onClick={() => onSelect?.(section)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect?.(section);
            }}
          >
            <Component data={section.data} />
          </div>
        );
      })}
    </div>
  );
}
