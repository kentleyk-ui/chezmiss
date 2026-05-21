"use client";

import { Section } from "@/types";
import { Copy, AlertCircle } from "lucide-react";
import { SECTION_TYPES, TEXT_ALIGNMENTS, TEXT_SIZES } from "@/lib/constants";
import { useValidation } from "@/hooks/useValidation";
import { useState } from "react";

interface FieldDefinition {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "color" | "url";
  options?: { label: string; value: string }[];
  required?: boolean;
  validation?: (value: any) => { isValid: boolean; error?: string };
}

interface PropertiesPanelProps {
  selected: Section | null;
  onChange: (section: Section) => void;
}

export const fieldsByType: Record<string, FieldDefinition[]> = {
  [SECTION_TYPES.HERO]: [
    { key: "title", label: "Titre", type: "text", required: true },
    { key: "subtitle", label: "Sous-titre", type: "text" },
    { key: "image", label: "Image URL", type: "url" },
  ],
  [SECTION_TYPES.TEXT]: [
    { key: "content", label: "Contenu", type: "textarea", required: true },
    {
      key: "alignment",
      label: "Alignement",
      type: "select",
      options: [
        { label: "Gauche", value: TEXT_ALIGNMENTS.LEFT },
        { label: "Centre", value: TEXT_ALIGNMENTS.CENTER },
        { label: "Droite", value: TEXT_ALIGNMENTS.RIGHT },
      ],
    },
    {
      key: "size",
      label: "Taille",
      type: "select",
      options: [
        { label: "Petit", value: TEXT_SIZES.SMALL },
        { label: "Moyen", value: TEXT_SIZES.MEDIUM },
        { label: "Grand", value: TEXT_SIZES.LARGE },
      ],
    },
  ],
  [SECTION_TYPES.IMAGE]: [
    { key: "url", label: "URL Image", type: "url", required: true },
    { key: "alt", label: "Texte alternatif", type: "text" },
    { key: "width", label: "Largeur (%)", type: "number" },
    { key: "height", label: "Hauteur (px)", type: "number" },
  ],
  [SECTION_TYPES.CTA]: [
    { key: "text", label: "Texte bouton", type: "text", required: true },
    { key: "url", label: "URL lien", type: "url", required: true },
    { key: "title", label: "Titre CTA", type: "text" },
  ],
  [SECTION_TYPES.GALLERY]: [
    { key: "title", label: "Titre galerie", type: "text" },
    { key: "images", label: "URLs images (séparées par ;)", type: "textarea" },
  ],
  [SECTION_TYPES.PRODUCT_GRID]: [
    { key: "title", label: "Titre", type: "text" },
    { key: "limit", label: "Nombre de produits", type: "number" },
  ],
  [SECTION_TYPES.VIDEO]: [
    { key: "url", label: "URL vidéo YouTube", type: "url", required: true },
    { key: "title", label: "Titre vidéo", type: "text" },
  ],
};

export default function PropertiesPanel({
  selected,
  onChange,
}: PropertiesPanelProps) {
  const { validateUrl, validateText, validateNumber, sanitizeText, sanitizeUrl } = useValidation();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!selected) {
    return (
      <div className="text-center py-12 text-[#f0c9e1]/50">
        Sélectionnez une section pour éditer
      </div>
    );
  }

  const fields = fieldsByType[selected.type] || [];

  const handleFieldChange = (key: string, value: string | number, fieldType: string) => {
    let processedValue: any = value;
    let error: string | undefined;

    // Validation
    if (fieldType === "url") {
      const validation = validateUrl(String(value));
      if (!validation.isValid) {
        error = validation.error;
      } else {
        processedValue = sanitizeUrl(String(value));
      }
    } else if (fieldType === "textarea" && key !== "images") {
      const validation = validateText(String(value));
      if (!validation.isValid) {
        error = validation.error;
      } else {
        processedValue = sanitizeText(String(value));
      }
    } else if (fieldType === "number") {
      const validation = validateNumber(value);
      if (!validation.isValid) {
        error = validation.error;
      }
    } else if (fieldType === "text") {
      processedValue = sanitizeText(String(value));
    }

    setFieldErrors({ ...fieldErrors, [key]: error || "" });

    if (!error) {
      onChange({
        ...selected,
        data: { ...selected.data, [key]: processedValue },
      });
    }
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
                <div className="flex items-center gap-1">
                  <label className="text-xs text-[#f0c9e1]/70 font-semibold">
                    {field.label}
                  </label>
                  {field.required && <span className="text-red-400 text-xs">*</span>}
                </div>

                {field.type === "text" && (
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      value={selected.data?.[field.key] || ""}
                      onChange={(e) => handleFieldChange(field.key, e.target.value, "text")}
                      className={`flex-1 px-3 py-2 bg-[#1a1320] border rounded text-[#f0c9e1] text-sm focus:outline-none transition ${
                        fieldErrors[field.key]
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-[#B79A5B]/20 focus:border-[#B79A5B]/50"
                      }`}
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

                {field.type === "url" && (
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={selected.data?.[field.key] || ""}
                      onChange={(e) => handleFieldChange(field.key, e.target.value, "url")}
                      className={`flex-1 px-3 py-2 bg-[#1a1320] border rounded text-[#f0c9e1] text-sm focus:outline-none transition ${
                        fieldErrors[field.key]
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-[#B79A5B]/20 focus:border-[#B79A5B]/50"
                      }`}
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
                    onChange={(e) => handleFieldChange(field.key, e.target.value, "number")}
                    className={`w-full mt-1 px-3 py-2 bg-[#1a1320] border rounded text-[#f0c9e1] text-sm focus:outline-none transition ${
                      fieldErrors[field.key]
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-[#B79A5B]/20 focus:border-[#B79A5B]/50"
                    }`}
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    value={selected.data?.[field.key] || ""}
                    onChange={(e) => handleFieldChange(field.key, e.target.value, "textarea")}
                    rows={4}
                    className={`w-full mt-1 px-3 py-2 bg-[#1a1320] border rounded text-[#f0c9e1] text-sm focus:outline-none transition resize-none ${
                      fieldErrors[field.key]
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-[#B79A5B]/20 focus:border-[#B79A5B]/50"
                    }`}
                  />
                )}

                {field.type === "select" && (
                  <select
                    value={selected.data?.[field.key] || ""}
                    onChange={(e) => handleFieldChange(field.key, e.target.value, "select")}
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

                {fieldErrors[field.key] && (
                  <div className="flex items-center gap-1 mt-1 text-red-400 text-xs">
                    <AlertCircle size={12} />
                    {fieldErrors[field.key]}
                  </div>
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

