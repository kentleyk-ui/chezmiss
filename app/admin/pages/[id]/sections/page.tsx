"use client"

import { useEffect, useState } from "react"
import Renderer from "@/app/components/builder/Renderer"
import PropertiesPanel from "@/app/components/builder/PropertiesPanel"

export default function SectionsPage({ params }: any) {
  const [sections, setSections] = useState([])
  const [selected, setSelected] = useState(null)

  async function loadSections() {
    const res = await fetch(`/api/sections?page_id=${params.id}`)
    const data = await res.json()
    setSections(data)
  }

  useEffect(() => {
    loadSections()
  }, [])

  return (
    <div className="flex">
      <div className="w-3/4 p-10">
        <Renderer sections={sections} onSelect={setSelected} />
      </div>

      <div className="w-1/4 bg-black/40 p-6">
        <PropertiesPanel selected={selected} onChange={() => {}} />
      </div>
    </div>
  )
}

