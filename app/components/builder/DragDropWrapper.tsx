"use client"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

export default function DragDropWrapper({ items, onReorder, children }: any) {
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i: any) => i.id === active.id)
      const newIndex = items.findIndex((i: any) => i.id === over.id)

      const newOrder = arrayMove(items, oldIndex, newIndex)
      onReorder(newOrder)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
