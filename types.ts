import { SECTION_TYPES, TEXT_ALIGNMENTS, TEXT_SIZES, GoldThemeKey } from "@/lib/constants";

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];
export type TextAlignment = (typeof TEXT_ALIGNMENTS)[keyof typeof TEXT_ALIGNMENTS];
export type TextSize = (typeof TEXT_SIZES)[keyof typeof TEXT_SIZES];

// Section data - flexible for runtime access
export interface SectionData {
  [key: string]: any;
}

// Specific section data types (for documentation/validation)
export interface HeroData extends SectionData {
  title?: string;
  subtitle?: string;
  image?: string;
}

export interface TextData extends SectionData {
  content?: string;
  alignment?: TextAlignment;
  size?: TextSize;
}

export interface ImageData extends SectionData {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface CTAData extends SectionData {
  title?: string;
  text?: string;
  url?: string;
}

export interface GalleryData extends SectionData {
  title?: string;
  images?: string;
}

export interface ProductGridData extends SectionData {
  title?: string;
  limit?: number;
}

export interface VideoData extends SectionData {
  url?: string;
  title?: string;
}

export interface Section {
  id: string | number;
  page_id: string;
  type: SectionType;
  position: number;
  data: SectionData;
  created_at?: string;
  updated_at?: string;
  locked?: boolean;
}

export interface Page {
  id: string | number;
  title: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export type GoldTheme = GoldThemeKey;

export interface ApiError {
  error: string;
  statusCode: number;
  timestamp?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode: number;
}
