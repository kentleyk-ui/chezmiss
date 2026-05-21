"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Renderer from "@/app/components/builder/Renderer";
import PropertiesPanel from "@/app/components/builder/PropertiesPanel";
import { Plus, Save, X, Loader2, Check } from "lucide-react";
import { Section } from "@/types";

export default function BuilderCanvas() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");

  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | number | null>(null);

  // Load sections
  useEffect(() => {
    if (!pageId) {
      setError("Aucune page sélectionnée");
      setIsLoading(false);
      return;
    }

    loadSections();
  }, [pageId]);

  const validatePageId = async (id: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from("pages")
        .select("id")
        .eq("id", id)
        .single();

      return !!data;
    } catch {
      return false;
    }
  };

  const loadSections = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!pageId) {
        setError("Page ID manquant");
        return;
      }

      const isValidPage = await validatePageId(pageId);
      if (!isValidPage) {
        setError("Page non trouvée");
        return;
      }

      const { data, error: err } = await supabase
        .from("sections")
        .select("*")
        .eq("page_id", pageId)
        .order("position", { ascending: true });

      if (err) throw err;

      setSections(data || []);
      setSelectedSection(null);
    } catch (err) {
      setError(`Erreur de chargement: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addSection = async (type: string) => {
    if (!pageId) return;

    try {
      const maxPosition = sections.length > 0 ? Math.max(...sections.map(s => s.position)) : -1;

      const response = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_id: pageId,
          type,
          position: maxPosition + 1,
          data: {},
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création");
      }

      setSections([...sections, data]);
      setSelectedSection(data);
      setSuccess("Section ajoutée");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur création section: ${String(err)}`);
    }
  };

  const updateSection = async (updatedSection: Section) => {
    try {
      setError(null);

      const response = await fetch(`/api/sections/${updatedSection.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedSection.data }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
      setSelectedSection(updatedSection);
      setSuccess("Section mise à jour");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur mise à jour: ${String(err)}`);
    }
  };

  const handleDeleteClick = (sectionId: string | number) => {
    if (deleteConfirm === sectionId) {
      deleteSection(sectionId);
    } else {
      setDeleteConfirm(sectionId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const deleteSection = async (sectionId: string | number) => {
    try {
      setError(null);

      const response = await fetch(`/api/sections/${sectionId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      setSections(sections.filter(s => s.id !== sectionId));
      setSelectedSection(null);
      setDeleteConfirm(null);
      setSuccess("Section supprimée");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur suppression: ${String(err)}`);
    }
  };

  const saveOrder = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch("/api/sections/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Erreur de sauvegarde");
      }

      setSuccess("Ordre sauvegardé");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur sauvegarde ordre: ${String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const sectionTypes = [
    { label: "Héro", value: "hero" },
    { label: "Texte", value: "texte" },
    { label: "Image", value: "image" },
    { label: "CTA", value: "cta" },
    { label: "Galerie", value: "gallery" },
    { label: "Grille Produits", value: "product-grid" },
    { label: "Vidéo", value: "video" },
  ];

  return (
    <main className="min-h-screen bg-black text-[#f0c9e1]">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-[#B79A5B]/20 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#B79A5B]">
            🎨 Chezmissificator V.2
          </h1>
          <div className="flex items-center gap-4">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            <button
              onClick={saveOrder}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-[#B79A5B] text-black rounded-lg font-semibold hover:bg-[#B79A5B]/90 disabled:opacity-50"
            >
              <Save size={18} /> Sauvegarder
            </button>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/30 text-red-400 p-4 mx-6 mt-6 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/20 border border-green-700/30 text-green-400 p-4 mx-6 mt-6 rounded flex items-center gap-2">
          <Check size={18} /> {success}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Canvas */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 text-[#f0c9e1]/50">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              Chargement des sections...
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-[#B79A5B]">
                  Ajouter une section
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sectionTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => addSection(type.value)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-[#B79A5B]/10 border border-[#B79A5B]/30 rounded hover:bg-[#B79A5B]/20 transition text-sm"
                    >
                      <Plus size={16} /> {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#B79A5B]/20 bg-[#0d0810]/50 p-8">
                <div className="space-y-4">
                  {sections.length === 0 ? (
                    <div className="text-center py-12 text-[#f0c9e1]/50">
                      Aucune section. Cliquez sur "Ajouter une section" pour commencer.
                    </div>
                  ) : (
                    sections.map((section, idx) => (
                      <div
                        key={section.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                          selectedSection?.id === section.id
                            ? "border-[#B79A5B] bg-[#B79A5B]/10"
                            : "border-[#B79A5B]/20 hover:border-[#B79A5B]/50"
                        }`}
                        onClick={() => setSelectedSection(section)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[#B79A5B]">
                              Section {idx + 1}
                            </p>
                            <p className="text-sm text-[#f0c9e1]/60">
                              Type: {section.type}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(section.id);
                            }}
                            className={`p-2 rounded transition ${
                              deleteConfirm === section.id
                                ? "bg-red-600 text-white font-semibold"
                                : "hover:bg-red-900/20 text-red-400"
                            }`}
                          >
                            {deleteConfirm === section.id ? "Confirmer?" : <X size={18} />}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-[#B79A5B]">
                  Aperçu
                </h3>
                <div className="rounded-xl border border-[#B79A5B]/20 bg-black p-6">
                  <Renderer sections={sections} onSelect={setSelectedSection} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Properties Panel */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-[#B79A5B]/20 bg-[#0d0810]/50 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-[#B79A5B]">
              Propriétés
            </h2>
            {selectedSection ? (
              <PropertiesPanel
                selected={selectedSection}
                onChange={updateSection}
              />
            ) : (
              <div className="text-[#f0c9e1]/50 text-center py-8">
                Sélectionnez une section pour éditer ses propriétés
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
