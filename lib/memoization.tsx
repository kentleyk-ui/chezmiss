import React, { useMemo } from "react";
import { Section } from "@/types";

// Memoized Renderer with strict equality check
export const RendererMemo = React.memo(
  ({ sections, onSelect }: any) => {
    const Renderer = require("@/app/components/builder/Renderer").default;
    return <Renderer sections={sections} onSelect={onSelect} />;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (don't re-render)
    return (
      prevProps.sections.length === nextProps.sections.length &&
      prevProps.sections.every(
        (s: Section, i: number) =>
          s.id === nextProps.sections[i].id &&
          s.position === nextProps.sections[i].position &&
          JSON.stringify(s.data) === JSON.stringify(nextProps.sections[i].data)
      ) &&
      prevProps.onSelect === nextProps.onSelect
    );
  }
);

RendererMemo.displayName = "RendererMemo";

// Memoized PropertiesPanel
export const PropertiesPanelMemo = React.memo(
  ({ selected, onChange }: any) => {
    const PropertiesPanel = require("@/app/components/builder/PropertiesPanel").default;
    return <PropertiesPanel selected={selected} onChange={onChange} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.selected?.id === nextProps.selected?.id &&
      prevProps.selected?.type === nextProps.selected?.type &&
      JSON.stringify(prevProps.selected?.data) === JSON.stringify(nextProps.selected?.data) &&
      prevProps.onChange === nextProps.onChange
    );
  }
);

PropertiesPanelMemo.displayName = "PropertiesPanelMemo";

// Memoized Section List Item
export const SectionItemMemo = React.memo(
  (props: any) => {
    return <div {...props} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.section.id === nextProps.section.id &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.idx === nextProps.idx
    );
  }
);

SectionItemMemo.displayName = "SectionItemMemo";

// Hook for memoized sections filtering
export function useFilteredSections(sections: Section[], searchFilter: string) {
  return useMemo(
    () => sections.filter(s =>
      s.type.toLowerCase().includes(searchFilter.toLowerCase())
    ),
    [sections, searchFilter]
  );
}

// Hook for memoized section components map
export function useSectionComponentMap() {
  return useMemo(() => {
    return {
      hero: () => import("@/app/components/sections/Hero"),
      texte: () => import("@/app/components/sections/Texte"),
      image: () => import("@/app/components/sections/ImageBlock"),
      cta: () => import("@/app/components/sections/CTA"),
      gallery: () => import("@/app/components/sections/Gallery"),
      "product-grid": () => import("@/app/components/sections/ProductGrid"),
      video: () => import("@/app/components/sections/VideoBlock"),
    };
  }, []);
}
