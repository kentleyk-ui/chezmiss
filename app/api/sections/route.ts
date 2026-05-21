import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// GET — liste des sections d'une page
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page_id = searchParams.get("page_id")

  if (!page_id) {
    return NextResponse.json(
      { error: "Missing page_id parameter" },
      { status: 400 }
    )
  }

  try {
    const { data, error } = await supabase
      .from("sections")
      .select("*")
      .eq("page_id", page_id)
      .order("position", { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    )
  }
}

// POST — créer une section
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { page_id, type, position, data } = body

    if (!page_id || !type) {
      return NextResponse.json(
        { error: "Missing required fields: page_id, type" },
        { status: 400 }
      )
    }

    const { data: section, error } = await supabase
      .from("sections")
      .insert([{ page_id, type, position, data: data || {} }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(section)
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create section" },
      { status: 500 }
    )
  }
}