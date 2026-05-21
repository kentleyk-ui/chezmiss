
"use client"

export default function PropertiesPanel({ selected, onChange }: any) {
  if (!selected) return <div className="p-6 text-white">Aucune section sélectionnée</div>

  return (
    <div className="p-6 text-white space-y-4">
      <h2 className="text-xl font-bold">Propriétés</h2>

      <input
        className="w-full p-2 bg-white/10 rounded"
        placeholder="Texte"
        value={selected.data?.text || ""}
        onChange={(e) => onChange({ ...selected, data: { ...selected.data, text: e.target.value } })}
      />

      <input
        className="w-full p-2 bg-white/10 rounded"
        placeholder="URL image"
        value={selected.data?.image || ""}
        onChange={(e) => onChange({ ...selected, data: { ...selected.data, image: e.target.value } })}
      />

      <input
        className="w-full p-2 bg-white/10 rounded"
        placeholder="Couleur"
        value={selected.data?.color || ""}
        onChange={(e) => onChange({ ...selected, data: { ...selected.data, color: e.target.value } })}
      />
    </div>
  )
}

