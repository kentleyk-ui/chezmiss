"use client";

import { Section, SectionData } from "@/types";
import { Copy } from "lucide-react";

interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "color";
  options?: { label: string; value: string }[];
}

interface PropertiesPanelProps {
  selected: Section | null;
  onChange: (section: Section) => void;
}

const fieldsByType: Record<string, FieldDefinition[]> = {
  hero: [
    { key: "title", label: "Titre", type: "text" },
    { key: "subtitle", label: "Sous-titre", type: "text" },
    { key: "image", label: "Image URL", type: "text" },
  ],
  texte: [
    { key: "content", label: "Contenu", type: "textarea" },
    { key: "alignment", label: "Alignement", type: "select", options: [
      { label: "Gauche", value: "left" },
      { label: "Centre", value: "center" },
      { label: "Droite", value: "right" },
    ]},
    { key: "size", label: "Taille", type: "select", options: [
      { label: "Petit", value: "small" },
      { label: "Moyen", value: "medium" },
      { label: "Grand", value: "large" },
    ]},
  ],
  image: [
    { key: "url", label: "URL Image", type: "text" },
    { key: "alt", label: "Texte alternatif", type: "text" },
    { key: "width", label: "Largeur (%)", type: "number" },
    { key: "height", label: "Hauteur (px)", type: "number" },
  ],
  cta: [
    { key: "text", label: "Texte bouton", type: "text" },
    { key: "url", label: "URL lien", type: "text" },
    { key: "title", label: "Titre CTA", type: "text" },
  ],
  gallery: [
    { key: "title", label: "Titre galerie", type: "text" },
    { key: "images", label: "URLs images (séparées par ;)", type: "textarea" },
  ],
  "product-grid": [
    { key: "title", label: "Titre", type: "text" },
    { key: "limit", label: "Nombre de produits", type: "number" },
  ],
  video: [
    { key: "url", label: "URL vidéo YouTube", type: "text" },
    { key: "title", label: "Titre vidéo", type: "text" },
  ],
};

export default function PropertiesPanel({
  selected,
  onChange,
}: PropertiesPanelProps) {
  if (!selected) {
    return (
      <div className="text-center py-12 text-[#f0c9e1]/50">
        Sélectionnez une section pour éditer
      </div>
    );
  }

  const fields = fieldsByType[selected.type] || [];

  const updateData = (key: string, value: any) => {
    onChange({
      ...selected,
      data: { ...selected.data, [key]: value },
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] tracking-widest text-[#B79A5B] mb-1 font-semibold">
          TYPE
        </p>
        <p className="text-[#f0c9e1] font-mono">{selected.type}</p>
      </div>

      <hr className="border-[#B79A5B]/20" />

      {fields.length === 0 ? (
        <div className="text-[#f0c9e1]/50 text-sm">
          Aucune propriété pour ce type de section
        </div>
      ) : (
        <>
          <p className="text-xs text-[#B79A5B] font-semibold uppercase tracking-wider">
            Propriétés
          </p>
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="text-xs text-[#f0c9e1]/70 font-semibold">
                  {field.label}
                </label>
                {field.type === "text" && (
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      value={selected.data?.[field.key] || ""}
                      onChange={(e) => updateData(field.key, e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#1a1320] border border-[#B79A5B]/20 rounded text-[#f0c9e1] text-sm focus:border-[#B79A5B]/50 outline-none"
                    />
                    {selected.data?.[field.key] && (
                      <button
                        onClick={() => copyToClipboard(selected.data[field.key])}
                        className="p-2 hover:bg-[#B79A5B]/10 rounded transition"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                )}
                {field.type === "number" && (
                  <input
                    type="number"
                    value={selected.data?.[field.key] || ""}
                    onChange={(e) => updateData(field.key, e.target.value ? parseInt(e.target.value) : "")}
                    className="w-full mt-1 px-3 py-2 bg-[#1a1320] border border-[#B79A5B]/20 rounded text-[#f0c9e1] text-sm focus:border-[#B79A5B]/50 outline-none"
                  />
                )}
                {field.type === "textarea" && (
                  <textarea
                    value={selected.data?.[field.key] || ""}
                    onChange={(e) => updateData(field.key, e.target.value)}
                    rows={4}
                    className="w-full mt-1 px-3 py-2 bg-[#1a1320] border border-[#B79A5B]/20 rounded text-[#f0c9e1] text-sm focus:border-[#B79A5B]/50 outline-none resize-none"
                  />
                )}
                {field.type === "select" && (
                  <select
                    value={selected.data?.[field.key] || ""}
                    onChange={(e) => updateData(field.key, e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-[#1a1320] border border-[#B79A5B]/20 rounded text-[#f0c9e1] text-sm focus:border-[#B79A5B]/50 outline-none"
                  >
                    <option value="">Sélectionner...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "color" && (
                  <input
                    type="color"
                    value={selected.data?.[field.key] || "#B79A5B"}
                    onChange={(e) => updateData(field.key, e.target.value)}
                    className="w-full mt-1 h-10 rounded cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <hr className="border-[#B79A5B]/20" />

      <div className="text-[10px] text-[#f0c9e1]/40 space-y-1">
        <p className="font-semibold text-[#B79A5B]/60">Metadata</p>
        <p>ID: {selected.id}</p>
        <p>Position: {selected.position}</p>
      </div>
    </div>
  );
}

