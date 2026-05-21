"use client"

import { useEffect, useState } from "react"
import Renderer from "@/app/components/builder/Renderer"
import PropertiesPanel from "@/app/components/builder/PropertiesPanel"
import DragDropWrapper from "@/app/components/builder/DragDropWrapper"
import SortableItem from "@/app/components/builder/SortableItem"

export default function SectionsPage({ params }: any) {
  const [sections, setSections] = useState([])
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(null)

  // Charger la page (pour récupérer le slug)
  async function loadPage() {
    const res = await fetch(`/api/pages/${params.id}`)
    const data = await res.json()
    setPage(data)
  }

  // Charger les sections
  async function loadSections() {
    const res = await fetch(`/api/sections?page_id=${params.id}`)
    const data = await res.json()
    setSections(data)
  }

  // Sauvegarder l'ordre après drag & drop
  async function saveOrder(newOrder: any) {
    setSections(newOrder)

    await fetch(`/api/sections/reorder`, {
      method: "POST",
      body: JSON.stringify(newOrder),
    })
  }

  useEffect(() => {
    loadPage()
    loadSections()
  }, [])

  return (
    <div className="flex">

      {/* COLONNE BUILDER */}
      <div className="w-3/4 p-10 space-y-6">

        {/* Bouton Preview Live */}
        <button
          onClick={() => window.open(`/preview/${page?.slug}`, "_blank")}
          className="px-4 py-2 bg-purple-600 rounded-lg text-white"
        >
          Preview Live
        </button>

        {/* Drag & Drop */}
        <DragDropWrapper items={sections} onReorder={saveOrder}>
          {sections.map((s: any) => (
            <SortableItem key={s.id} id={s.id}>
              <div onClick={() => setSelected(s)}>
                <Renderer sections={[s]} />
              </div>
            </SortableItem>
          ))}
        </DragDropWrapper>

      </div>

      {/* COLONNE PROPRIÉTÉS */}
      <div className="w-1/4 bg-black/40 p-6">
        <PropertiesPanel selected={selected} onChange={() => {}} />
      </div>

    </div>
  )
}