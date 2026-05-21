// Type definitions for CHEZ MISS builder system

export interface SectionData {
  [key: string]: any;
}

export interface Section {
  id: string | number;
  page_id?: string | number;
  type: "hero" | "texte" | "image" | "cta" | "gallery" | "product-grid" | "video";
  position: number;
  data: SectionData;
  created_at?: string;
  updated_at?: string;
}

export interface RendererProps {
  sections: Section[];
  onSelect?: (section: Section) => void;
}

export interface PublicRendererProps {
  sections: Section[];
}

export interface PropertiesPanelProps {
  selected: Section | null;
  onChange: (section: Section) => void;
}

export interface SectionComponentProps {
  data: SectionData;
  onEdit?: (data: SectionData) => void;
}

export interface Page {
  id: string | number;
  title: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminParams {
  id: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}
