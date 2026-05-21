// Section types with validation
export const SECTION_TYPES = {
  HERO: "hero",
  TEXT: "texte",
  IMAGE: "image",
  CTA: "cta",
  GALLERY: "gallery",
  PRODUCT_GRID: "product-grid",
  VIDEO: "video",
} as const;

export type SectionType = (typeof SECTION_TYPES)[keyof typeof SECTION_TYPES];

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: "Héro",
  texte: "Texte",
  image: "Image",
  cta: "CTA",
  gallery: "Galerie",
  "product-grid": "Grille Produits",
  video: "Vidéo",
};

// Text alignment and size constants
export const TEXT_ALIGNMENTS = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

export const TEXT_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

// Gold theme colors
export const GOLD_COLORS = {
  default: "#B79A5B",
  champagne: "#F7E7CE",
  "rose-gold": "#E6B7A9",
  "royal-satin": "#C9A86A",
  "deep-luxe": "#B8860B",
} as const;

export type GoldThemeKey = keyof typeof GOLD_COLORS;

// UI constants
export const UI_CONSTANTS = {
  INACTIVITY_TIMEOUT_MS: 20000,
  AUTO_SAVE_DEBOUNCE_MS: 3000,
  DELETE_CONFIRM_TIMEOUT_MS: 3000,
  KEYBOARD_SHORTCUTS: {
    UNDO: "ctrl+z",
    REDO: "ctrl+y",
    SAVE: "ctrl+s",
  },
} as const;

// Validation constants
export const VALIDATION = {
  MIN_SECTION_NAME_LENGTH: 1,
  MAX_SECTION_NAME_LENGTH: 255,
  MAX_IMAGE_URL_LENGTH: 2048,
  MAX_TEXT_CONTENT_LENGTH: 10000,
  MAX_PRODUCTS_PER_GRID: 100,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  SECTION_CREATION_FAILED: "Erreur lors de la création de la section",
  SECTION_UPDATE_FAILED: "Erreur lors de la mise à jour de la section",
  SECTION_DELETE_FAILED: "Erreur lors de la suppression de la section",
  INVALID_SECTION_TYPE: "Type de section invalide",
  INVALID_URL: "URL invalide",
  NETWORK_ERROR: "Erreur réseau. Veuillez réessayer.",
  UNKNOWN_ERROR: "Une erreur inconnue s'est produite",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SECTION_CREATED: "Section créée",
  SECTION_UPDATED: "Section mise à jour",
  SECTION_DELETED: "Section supprimée",
  SECTION_DUPLICATED: "Section dupliquée",
  PAGES_SAVED: "Pages sauvegardées",
  ORDER_SAVED: "Ordre sauvegardé",
} as const;
