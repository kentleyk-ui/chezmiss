import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// GET — liste des sections d'une page
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page_id = searchParams.get("page_id")

  const { data, error } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", page_id)
    .order("position", { ascending: true })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}

// POST — créer une section
export async function POST(req: Request) {
  const body = await req.json()
  const { page_id, type, position, data } = body

  const { data: section, error } = await supabase
    .from("sections")
    .insert([{ page_id, type, position, data }])
    .select()
    .single()

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(section)
}