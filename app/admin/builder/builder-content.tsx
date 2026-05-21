"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Renderer from "@/app/components/builder/Renderer";
import PropertiesPanel from "@/app/components/builder/PropertiesPanel";
import { Plus, Save, X, Loader2, Check, Undo2, Redo2, Copy, Download, Eye, Smartphone, Monitor, Download as FileDownload } from "lucide-react";
import { Section } from "@/types";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import { useGoldTheme } from "@/hooks/useGoldTheme";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { sectionTemplates, sectionTypes } from "@/lib/sectionTemplates";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SectionItemProps {
  section: Section;
  idx: number;
  isSelected: boolean;
  onSelect: (section: Section) => void;
  onDelete: (sectionId: string | number) => void;
  deleteConfirm: string | number | null;
  onDuplicate: (section: Section) => void;
}

function SortableSectionItem({
  section,
  idx,
  isSelected,
  onSelect,
  onDelete,
  deleteConfirm,
  onDuplicate,
}: SectionItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing transition ${
        isSelected ? "border-[#B79A5B] bg-[#B79A5B]/10" : "border-[#B79A5B]/20 hover:border-[#B79A5B]/50"
      } ${isDragging ? "shadow-lg" : ""}`}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center justify-between">
        <div onClick={() => onSelect(section)} className="flex-1 cursor-pointer">
          <p className="font-semibold text-[#B79A5B]">Section {idx + 1}</p>
          <p className="text-sm text-[#f0c9e1]/60">Type: {section.type}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onDuplicate(section)}
            className="p-2 rounded transition hover:bg-[#B79A5B]/10 text-[#B79A5B]"
            title="Dupliquer"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(section.id);
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
    </div>
  );
}

export function BuilderContent() {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const { theme } = useGoldTheme();
  const { push, undo, redo, canUndo, canRedo } = useUndoRedo();

  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | number | null>(null);
  const [preview, setPreview] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedForBatch, setSelectedForBatch] = useState<Set<string | number>>(new Set());
  const [showTemplates, setShowTemplates] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!pageId) {
      setError("Aucune page sélectionnée");
      setIsLoading(false);
      return;
    }
    loadSections();
  }, [pageId]);

  useEffect(() => {
    if (autoSave && isSaving === false) {
      autoSaveRef.current = setTimeout(() => {
        if (sections.length > 0) {
          saveOrder();
        }
      }, 3000);
    }
    return () => {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    };
  }, [sections, autoSave]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        const prevState = undo();
        if (prevState) setSections(prevState);
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        const nextState = redo();
        if (nextState) setSections(nextState);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveOrder();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const validatePageId = async (id: string): Promise<boolean> => {
    try {
      const { data } = await supabase.from("pages").select("id").eq("id", id).single();
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
      push(data || []);
    } catch (err) {
      setError(`Erreur de chargement: ${String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addSection = async (type: string, template?: string) => {
    if (!pageId) return;

    try {
      const maxPosition = sections.length > 0 ? Math.max(...sections.map(s => s.position)) : -1;
      const templateData = template ? sectionTemplates[template]?.data : {};

      const response = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_id: pageId,
          type,
          position: maxPosition + 1,
          data: templateData || {},
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la création");
      }

      const newSections = [...sections, data];
      setSections(newSections);
      setSelectedSection(data);
      push(newSections);
      setSuccess("Section ajoutée");
      setTimeout(() => setSuccess(null), 3000);
      setShowTemplates(false);
    } catch (err) {
      setError(`Erreur création section: ${String(err)}`);
    }
  };

  const duplicateSection = async (section: Section) => {
    if (!pageId) return;

    try {
      const maxPosition = Math.max(...sections.map(s => s.position)) || 0;

      const response = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_id: pageId,
          type: section.type,
          position: maxPosition + 1,
          data: JSON.parse(JSON.stringify(section.data)),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la duplication");
      }

      const newSections = [...sections, data];
      setSections(newSections);
      setSelectedSection(data);
      push(newSections);
      setSuccess("Section dupliquée");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur duplication: ${String(err)}`);
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

      const newSections = sections.map(s => s.id === updatedSection.id ? updatedSection : s);
      setSections(newSections);
      setSelectedSection(updatedSection);
      push(newSections);
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

      const newSections = sections.filter(s => s.id !== sectionId);
      setSections(newSections);
      setSelectedSection(null);
      push(newSections);
      setDeleteConfirm(null);
      setSuccess("Section supprimée");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur suppression: ${String(err)}`);
    }
  };

  const deleteBatchSections = async () => {
    try {
      setError(null);
      for (const sectionId of selectedForBatch) {
        await fetch(`/api/sections/${sectionId}`, { method: "DELETE" });
      }
      const newSections = sections.filter(s => !selectedForBatch.has(s.id));
      setSections(newSections);
      push(newSections);
      setSelectedForBatch(new Set());
      setSuccess(`${selectedForBatch.size} section(s) supprimée(s)`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur suppression batch: ${String(err)}`);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over.id);

      const newSections = arrayMove(sections, oldIndex, newIndex).map((s, idx) => ({
        ...s,
        position: idx,
      }));

      setSections(newSections);
      push(newSections);
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

      if (!autoSave) {
        setSuccess("Ordre sauvegardé");
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(`Erreur sauvegarde ordre: ${String(err)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const exportPage = async () => {
    try {
      const pageData = {
        pageId,
        sections,
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(pageData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `page-${pageId}.json`;
      a.click();
      setSuccess("Page exportée");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Erreur export: ${String(err)}`);
    }
  };

  const filteredSections = sections.filter(s =>
    s.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-[#f0c9e1]">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-[#B79A5B]/20 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-auto py-4 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl font-bold text-[#B79A5B]">🎨 Chezmissificator V.2</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="flex items-center gap-2 text-xs text-[#f0c9e1]/70">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="rounded"
              />
              Auto-save
            </label>
            {isSaving && <Loader2 className="w-4 h-4 animate-spin text-[#B79A5B]" />}
            <button
              onClick={() => {
                const prevState = undo();
                if (prevState) setSections(prevState);
              }}
              disabled={!canUndo}
              className="p-2 bg-[#B79A5B]/10 hover:bg-[#B79A5B]/20 rounded disabled:opacity-30 transition"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={18} />
            </button>
            <button
              onClick={() => {
                const nextState = redo();
                if (nextState) setSections(nextState);
              }}
              disabled={!canRedo}
              className="p-2 bg-[#B79A5B]/10 hover:bg-[#B79A5B]/20 rounded disabled:opacity-30 transition"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={18} />
            </button>
            <div className="w-px h-6 bg-[#B79A5B]/20" />
            <LiquidMetalButton label="Sauvegarder" onClick={saveOrder} />
            <LiquidMetalButton label="Exporter" onClick={exportPage} />
          </div>
        </div>
      </div>

      {/* Messages */}
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
              {/* Section Types */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-[#B79A5B]">Ajouter une section</h2>
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

              {/* Templates */}
              <div className="mb-8">
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="text-sm font-semibold text-[#B79A5B] mb-3 flex items-center gap-2"
                >
                  ✨ Modèles {showTemplates ? "▼" : "▶"}
                </button>
                {showTemplates && (
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {Object.entries(sectionTemplates).map(([key, template]) => (
                      <button
                        key={key}
                        onClick={() => {
                          const [, type] = key.split("-");
                          addSection(type, key);
                        }}
                        className="p-3 bg-[#B79A5B]/5 border border-[#B79A5B]/15 rounded text-xs text-[#f0c9e1]/70 hover:bg-[#B79A5B]/15 transition text-center"
                      >
                        {template.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Filter */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Filtrer par type..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-[#1a1320] border border-[#B79A5B]/20 rounded text-[#f0c9e1] text-sm focus:border-[#B79A5B]/50 outline-none"
                />
              </div>

              {/* Sections List */}
              <div className="rounded-xl border border-[#B79A5B]/20 bg-[#0d0810]/50 p-8 mb-8">
                {selectedForBatch.size > 0 && (
                  <div className="mb-4 p-3 bg-[#B79A5B]/10 border border-[#B79A5B]/20 rounded flex items-center justify-between">
                    <span className="text-sm text-[#f0c9e1]">
                      {selectedForBatch.size} section(s) sélectionnée(s)
                    </span>
                    <button
                      onClick={deleteBatchSections}
                      className="px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded text-xs text-white transition"
                    >
                      Supprimer tout
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {filteredSections.length === 0 ? (
                    <div className="text-center py-12 text-[#f0c9e1]/50">
                      {searchFilter ? "Aucune section ne correspond." : "Aucune section. Cliquez sur un type pour commencer."}
                    </div>
                  ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={filteredSections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        {filteredSections.map((section, idx) => (
                          <SortableSectionItem
                            key={section.id}
                            section={section}
                            idx={idx}
                            isSelected={selectedSection?.id === section.id}
                            onSelect={setSelectedSection}
                            onDelete={handleDeleteClick}
                            deleteConfirm={deleteConfirm}
                            onDuplicate={duplicateSection}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              </div>

              {/* Preview Controls */}
              <div className="mb-8 flex gap-2">
                <button
                  onClick={() => setPreview("mobile")}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                    preview === "mobile"
                      ? "bg-[#B79A5B]/30 text-[#B79A5B]"
                      : "bg-[#B79A5B]/10 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/20"
                  }`}
                >
                  <Smartphone size={16} /> Mobile
                </button>
                <button
                  onClick={() => setPreview("tablet")}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                    preview === "tablet"
                      ? "bg-[#B79A5B]/30 text-[#B79A5B]"
                      : "bg-[#B79A5B]/10 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/20"
                  }`}
                >
                  <Monitor size={16} /> Tablet
                </button>
                <button
                  onClick={() => setPreview("desktop")}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                    preview === "desktop"
                      ? "bg-[#B79A5B]/30 text-[#B79A5B]"
                      : "bg-[#B79A5B]/10 text-[#f0c9e1]/70 hover:bg-[#B79A5B]/20"
                  }`}
                >
                  <Monitor size={16} /> Desktop
                </button>
              </div>

              {/* Preview */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#B79A5B]">Aperçu</h3>
                <div
                  className={`rounded-xl border border-[#B79A5B]/20 bg-black p-6 overflow-auto ${
                    preview === "mobile" ? "max-w-sm mx-auto" : preview === "tablet" ? "max-w-2xl mx-auto" : ""
                  }`}
                >
                  <Renderer sections={sections} onSelect={setSelectedSection} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Properties Panel */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-[#B79A5B]/20 bg-[#0d0810]/50 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-[#B79A5B]">Propriétés</h2>
            {selectedSection ? (
              <PropertiesPanel selected={selectedSection} onChange={updateSection} />
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
