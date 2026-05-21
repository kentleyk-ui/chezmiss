export interface SectionData {
  [key: string]: any;
}

export interface Section {
  id: string | number;
  page_id: string;
  type: string;
  position: number;
  data: SectionData;
  created_at?: string;
  updated_at?: string;
  locked?: boolean;
}

export type GoldTheme = "default" | "champagne" | "rose-gold" | "royal-satin" | "deep-luxe";
