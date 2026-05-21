import { Section, SectionData } from "@/types";

export const sectionTemplates: Record<string, { name: string; data: SectionData }> = {
  "hero-default": {
    name: "Hero Basique",
    data: {
      title: "Titre Principal",
      subtitle: "Sous-titre descriptif",
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop",
    },
  },
  "text-large": {
    name: "Texte Large",
    data: {
      content: "Votre texte principal ici. Exprimez votre message de marque avec élégance.",
      alignment: "center",
      size: "large",
    },
  },
  "cta-primary": {
    name: "CTA Primaire",
    data: {
      title: "Appelez à l'action",
      text: "En savoir plus",
      url: "#",
    },
  },
  "gallery-three": {
    name: "Galerie 3 Images",
    data: {
      title: "Galerie",
      images: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop;https://images.unsplash.com/photo-1461808016302-491673cf4e88?w=600&h=400&fit=crop;https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
    },
  },
  "product-grid-default": {
    name: "Grille Produits",
    data: {
      title: "Nos Produits",
      limit: 6,
    },
  },
};

export const sectionTypes = [
  { label: "Héro", value: "hero" },
  { label: "Texte", value: "texte" },
  { label: "Image", value: "image" },
  { label: "CTA", value: "cta" },
  { label: "Galerie", value: "gallery" },
  { label: "Grille Produits", value: "product-grid" },
  { label: "Vidéo", value: "video" },
];
